package com.example.kot

import java.io.File
import javax.xml.parsers.DocumentBuilderFactory

data class Node(val id: Long, val lat: Double, val lon: Double)
data class Way(val id: Long, val refs: List<Long>)

fun loadNodesAndWays(xmlFile: File): Pair<Map<Long, Node>, List<Way>> {
    val nodes = mutableMapOf<Long, Node>()
    val ways = mutableListOf<Way>()

    println("OSM 파일 경로: ${xmlFile.absolutePath}")

    val doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(xmlFile)

    val nodeList = doc.getElementsByTagName("node")
    for (i in 0 until nodeList.length) {
        val el = nodeList.item(i) as org.w3c.dom.Element
        val id = el.getAttribute("id").toLong()
        val lat = el.getAttribute("lat").toDouble()
        val lon = el.getAttribute("lon").toDouble()
        nodes[id] = Node(id, lat, lon)

        if (i < 5) {
            println("Node ID: $id, 위도: $lat, 경도: $lon")
        }
    }

    val wayList = doc.getElementsByTagName("way")
    println("Way 수: ${wayList.length}")
    for (i in 0 until wayList.length) {
        val el = wayList.item(i) as org.w3c.dom.Element
        val id = el.getAttribute("id").toLong()
        val refs = el.getElementsByTagName("nd").let { nds ->
            List(nds.length) {
                val nd = nds.item(it) as org.w3c.dom.Element
                nd.getAttribute("ref").toLong()
            }
        }
        ways.add(Way(id, refs))

        if (i < 3) {
            println("Way ID: $id, 노드 수: ${refs.size}, 첫 3개 노드 ID: ${refs.take(3)}")
        }
    }
    println("노드 총계: ${nodes.size}, 도로 총계: ${ways.size}")
    return Pair(nodes, ways)
}