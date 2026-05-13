package com.mrkaroll.steptracker

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class StepModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "StepModule"
    }

    @ReactMethod
    fun getStepCount(promise: Promise) {
        promise.resolve(1234)
    }
}