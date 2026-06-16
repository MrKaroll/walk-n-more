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

class StepModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), SensorEventListener {

    private var sensorManager: SensorManager? = null
    private var stepSensor: Sensor? = null
    private var steps: Int = 0

    init {
        sensorManager =
            reactContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager

        stepSensor =
            sensorManager?.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)

        stepSensor?.also {
            sensorManager?.registerListener(
                this,
                it,
                SensorManager.SENSOR_DELAY_UI
            )
        }
    }

    override fun getName(): String {
        return "StepModule"
    }

    @ReactMethod
    fun getSteps(promise: Promise) {
        promise.resolve(steps)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event?.sensor?.type == Sensor.TYPE_STEP_COUNTER) {
            steps = event.values[0].toInt()
            println("STEP SENSOR VALUE: $steps")
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
}