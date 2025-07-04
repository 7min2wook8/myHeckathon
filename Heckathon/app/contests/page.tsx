"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Clock, Users, Plus } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const contests = [
  {
    id: 1,
    title: "2025 스타트업 아이디어 공모전",
    category: "창업",
    location: "서울",
    deadline: "2025-02-28",
    image: "/placeholder.svg?height=200&width=300",
    participants: 156,
    prize: "1억원",
    status: "모집중",
  },
  {
    id: 2,
    title: "대학생 광고 크리에이티브 공모전",
    category: "광고",
    location: "부산",
    deadline: "2025-03-05",
    image: "/placeholder.svg?height=200&width=300",
    participants: 89,
    prize: "5천만원",
    status: "모집중",
  },
  {
    id: 3,
    title: "모바일 앱 개발 공모전",
    category: "IT",
    location: "대구",
    deadline: "2025-03-12",
    image: "/placeholder.svg?height=200&width=300",
    participants: 234,
    prize: "3천만원",
    status: "모집중",
  },
  {
    id: 4,
    title: "사회혁신 아이디어 공모전",
    category: "사회",
    location: "인천",
    deadline: "2025-03-18",
    image: "/placeholder.svg?height=200&width=300",
    participants: 67,
    prize: "2천만원",
    status: "마감임박",
  },
  {
    id: 5,
    title: "친환경 제품 디자인 공모전",
    category: "디자인",
    location: "광주",
    deadline: "2025-03-25",
    image: "/placeholder.svg?height=200&width=300",
    participants: 123,
    prize: "4천만원",
    status: "모집중",
  },
  {
    id: 6,
    title: "청년 정책 제안 공모전",
    category: "정책",
    location: "대전",
    deadline: "2025-04-01",
    image: "/placeholder.svg?height=200&width=300",
    participants: 45,
    prize: "1천만원",
    status: "모집중",
  },
]

export default function ContestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedLocation, setSelectedLocation] = useState("전체")
  const [selectedStatus, setSelectedStatus] = useState("전체")

  const filteredContests = contests.filter((contest) => {
    return (
      contest.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "전체" || contest.category === selectedCategory) &&
      (selectedLocation === "전체" || contest.location === selectedLocation) &&
      (selectedStatus === "전체" || contest.status === selectedStatus)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">공모전 찾기</h1>
            <p className="text-gray-600 mt-2">다양한 공모전을 탐색하고 참여해보세요</p>
          </div>
          <Link href="/contests/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              공모전 등록
            </Button>
          </Link>
        </div>

        {/* 검색 및 필터 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* 검색 */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="공모전 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* 카테고리 필터 */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체 카테고리</SelectItem>
                  <SelectItem value="창업">창업</SelectItem>
                  <SelectItem value="광고">광고</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="사회">사회</SelectItem>
                  <SelectItem value="디자인">디자인</SelectItem>
                  <SelectItem value="정책">정책</SelectItem>
                </SelectContent>
              </Select>

              {/* 지역 필터 */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="지역" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체 지역</SelectItem>
                  <SelectItem value="서울">서울</SelectItem>
                  <SelectItem value="부산">부산</SelectItem>
                  <SelectItem value="대구">대구</SelectItem>
                  <SelectItem value="인천">인천</SelectItem>
                  <SelectItem value="광주">광주</SelectItem>
                  <SelectItem value="대전">대전</SelectItem>
                </SelectContent>
              </Select>

              {/* 상태 필터 */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체 상태</SelectItem>
                  <SelectItem value="모집중">모집중</SelectItem>
                  <SelectItem value="마감임박">마감임박</SelectItem>
                  <SelectItem value="마감">마감</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 결과 개수 */}
        <div className="mb-6">
          <p className="text-gray-600">
            총 <span className="font-semibold text-blue-600">{filteredContests.length}</span>개의 공모전이 있습니다
          </p>
        </div>

        {/* 공모전 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest) => (
            <Card key={contest.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={contest.image || "/placeholder.svg"}
                  alt={contest.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge>{contest.category}</Badge>
                  <Badge variant={contest.status === "마감임박" ? "destructive" : "secondary"}>{contest.status}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{contest.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {contest.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {contest.participants}명
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-red-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {contest.deadline}
                    </div>
                    <div className="font-semibold text-blue-600">상금 {contest.prize}</div>
                  </div>
                </div>
                <Link href={`/contests/${contest.id}`}>
                  <Button className="w-full mt-4">자세히 보기</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 빈 상태 */}
        {filteredContests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">검색 조건에 맞는 공모전이 없습니다.</p>
            <p className="text-gray-400 mt-2">다른 조건으로 검색해보세요.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
