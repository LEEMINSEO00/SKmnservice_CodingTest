package com.example.kot

import com.example.kot.loadNodesAndWays
import com.example.kot.GPSPoint
import com.example.kot.loadGPSPoints
import java.io.File

fun main() {
    //road.osm
    val file = File("/Users/lms/Desktop/git/SKmnservice_CodingTest/95389465-task-1/kot/src/main/resources/roads.osm")
    if (!file.exists()) {
        println("roads.osm 파일을 찾을 수 없습니다.")
        return
    }

    val (nodes, ways) = loadNodesAndWays(file)
    println()

    //gps.csv
    val gpsFolder = File("/Users/lms/Desktop/git/SKmnservice_CodingTest/95389465-task-1/kot/src/main/resources")
    val csvFileNames = listOf(
        "gps_left_turn.csv",
        "gps_left02_turn.csv",
        "gps_reverse_direction.csv",
        "gps_right_turn_01.csv",
        "gps_right02_turn.csv",
        "gps_straight01.csv",
        "gps_straight02.csv",
        "gps_straight03.csv",
        "gps_straight04.csv",
        "gps_multipath.csv"
    )

    for (fileName in csvFileNames) {
        val gpsFile = File(gpsFolder, fileName)
        if (!gpsFile.exists()) {
            println("GPS CSV 파일을 찾을 수 없습니다.")
            continue
        }
        println("[$fileName]")
        val gpsPoints: List<GPSPoint> = loadGPSPoints(gpsFile)
        println()
    }
}