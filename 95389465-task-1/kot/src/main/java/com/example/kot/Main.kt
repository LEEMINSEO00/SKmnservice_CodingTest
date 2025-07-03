package com.example.kot

import com.example.a95389465_task_1.loadNodesAndWays
import java.io.File

fun main() {
    val file = File("/Users/lms/Desktop/git/SKmnservice_CodingTest/95389465-task-1/kot/src/main/resources/roads.osm")
    if (!file.exists()) {
        println("roads.osm 파일을 찾을 수 없습니다.")
        return
    }

    val (nodes, ways) = loadNodesAndWays(file)
}