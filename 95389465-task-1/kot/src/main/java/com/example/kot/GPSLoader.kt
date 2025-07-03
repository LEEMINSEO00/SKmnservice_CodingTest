package com.example.a95389465_task_1

import java.io.File

data class GPSPoint(val lat: Double, val lon: Double, val angle: Double)

fun loadGPSPoints(csvFile: File): List<GPSPoint> {
    return csvFile.readLines()
        .filter { it.trim().isNotEmpty() && !it.startsWith("Latitude") }
        .mapIndexed { index, line ->
            val parts = line.split(",")
            val point = GPSPoint(parts[0].toDouble(), parts[1].toDouble(), parts[2].toDouble())

            if (index < 10) {
                println("[$index] 위도: ${point.lat}, 경도: ${point.lon}, 각도: ${point.angle}")
            }
            point
        }
}