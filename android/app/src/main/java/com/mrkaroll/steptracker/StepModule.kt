package com.mrkaroll.steptracker

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class StepModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), SensorEventListener {

    private val sensorManager =
        reactContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager

    private val stepCounterSensor: Sensor? =
        sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)

    private var rawSteps: Int = 0

    private val prefs =
        reactContext.getSharedPreferences("step_tracker_prefs", Context.MODE_PRIVATE)

    init {
        stepCounterSensor?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
        }
    }

    override fun getName(): String {
        return "StepModule"
    }

    @ReactMethod
    fun getStepCount(promise: Promise) {
        if (stepCounterSensor == null) {
            promise.reject("NO_SENSOR", "Step counter sensor not available")
            return
        }

        ensureDailyBaseline()

        val baseline = prefs.getInt(getTodayBaselineKey(), rawSteps)
        val todaySteps = (rawSteps - baseline).coerceAtLeast(0)

        promise.resolve(todaySteps)
    }

    @ReactMethod
    fun resetTodaySteps(promise: Promise) {
        prefs.edit()
            .putInt(getTodayBaselineKey(), rawSteps)
            .apply()

        promise.resolve(true)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event?.sensor?.type == Sensor.TYPE_STEP_COUNTER) {
            rawSteps = event.values[0].toInt()
            ensureDailyBaseline()
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    private fun ensureDailyBaseline() {
        val key = getTodayBaselineKey()

        if (!prefs.contains(key)) {
            prefs.edit()
                .putInt(key, rawSteps)
                .apply()
        }
    }

    private fun getTodayBaselineKey(): String {
        val date = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
        return "baseline_$date"
    }
}