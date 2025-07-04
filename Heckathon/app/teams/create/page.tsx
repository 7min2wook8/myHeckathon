"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Plus, X, Users, Trophy, CheckCircle, Loader2 } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

const availableRoles = [
  "프론트엔드 개발자",
  "백엔드 개발자",
  "풀스택 개발자",
  "모바일 개발자",
  "UI/UX 디자이너",
  "그래픽 디자이너",
  "기획자",
  "마케터",
  "데이터 사이언티스트",
  "DevOps 엔지니어",
  "QA 엔지니어",
  "프로젝트 매니저"
]

const availableSkills = [
  "React", "Vue.js", "Angular", "Node.js", "Python", "Java", "JavaScript", "TypeScript",
  "Flutter", "React Native", "Swift", "Kotlin", "Figma", "Sketch", "Photoshop",
  "마케팅", "SEO", "콘텐츠", "데이터분석", "머신러닝", "AWS", "Docker", "Kubernetes"
]

const contests = [
  { id: 1, title: "2025 스타트업 아이디어 공모전" },
  { id: 2, title: "AI 혁신 아이디어 공모전" },
  { id: 3, title: "모바일 앱 개발 공모전" },
  { id: 4, title: "환경보호 캠페인 공모전" },
  { id: 5, title: "사회혁신 아이디어 공모전" }
]

function TeamCreateContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contestId: "",
    location: "",
    maxMembers: 4,
    neededRoles: [] as string[],
    skills: [] as string[],
    requirements: "",
    contactMethod: "platform", // platform, email, kakao
    contactInfo: "",
    isPublic: true,
    allowDirectApply: true
  })

  const [newRole, setNewRole] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("팀 생성 데이터:", formData)
      setSuccess(true)

      // 3초 후 팀 목록으로 이동
      setTimeout(() => {
        router.push("/teams")
      }, 3000)
    } catch (error) {
      console.error("팀 생성 오류:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addRole = () => {
    if (newRole && !formData.neededRoles.includes(newRole)) {
      setFormData({
        ...formData,
        neededRoles: [...formData.neededRoles, newRole]
      })
    }
    setNewRole("")
  }

  const removeRole = (role: string) => {
    setFormData({
      ...formData,
      neededRoles: formData.neededRoles.filter(r => r !== role)
    })
  }

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill]
      })
    }
    setNewSkill("")
  }

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    })
  }

  if (!user) return null

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">팀 생성 완료!</h2>
              <p className="text-gray-600 mb-6">
                팀이 성공적으로 생성되었습니다.
                <br />
                이제 팀원들의 지원을 받을 수 있어요!
              </p>
              <div className="flex gap-2">
                <Link href="/teams" className="flex-1">
                  <Button className="w-full">팀 목록 보기</Button>
                </Link>
                <Link href="/mypage" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    마이페이지
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/teams">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">팀 만들기</h1>
              <p className="text-gray-600">새로운 팀을 만들고 팀원을 모집해보세요</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 메인 정보 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 기본 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    기본 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">팀명 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="팀명을 입력하세요"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">팀 소개 *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="팀에 대한 소개와 목표를 작성해주세요"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contest">참가 공모전 *</Label>
                      <Select
                        value={formData.contestId}
                        onValueChange={(value) => setFormData({ ...formData, contestId: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="공모전 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {contests.map((contest) => (
                            <SelectItem key={contest.id} value={contest.id.toString()}>
                              {contest.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">활동 지역 *</Label>
                      <Select
                        value={formData.location}
                        onValueChange={(value) => setFormData({ ...formData, location: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="지역 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="서울">서울</SelectItem>
                          <SelectItem value="부산">부산</SelectItem>
                          <SelectItem value="대구">대구</SelectItem>
                          <SelectItem value="인천">인천</SelectItem>
                          <SelectItem value="광주">광주</SelectItem>
                          <SelectItem value="대전">대전</SelectItem>
                          <SelectItem value="온라인">온라인</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxMembers">최대 팀원 수</Label>
                    <Select
                      value={formData.maxMembers.toString()}
                      onValueChange={(value) => setFormData({ ...formData, maxMembers: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2명</SelectItem>
                        <SelectItem value="3">3명</SelectItem>
                        <SelectItem value="4">4명</SelectItem>
                        <SelectItem value="5">5명</SelectItem>
                        <SelectItem value="6">6명</SelectItem>
                        <SelectItem value="7">7명</SelectItem>
                        <SelectItem value="8">8명</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* 모집 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle>모집 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>모집하는 역할</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.neededRoles.map((role) => (
                        <Badge key={role} variant="secondary" className="flex items-center gap-1">
                          {role}
                          <button
                            type="button"
                            onClick={() => removeRole(role)}
                            className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Select value={newRole} onValueChange={setNewRole}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="역할 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles
                            .filter(role => !formData.neededRoles.includes(role))
                            .map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" onClick={addRole} disabled={!newRole} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>필요한 기술 스택</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="flex items-center gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Select value={newSkill} onValueChange={setNewSkill}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="기술 스택 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSkills
                            .filter(skill => !formData.skills.includes(skill))
                            .map((skill) => (
                              <SelectItem key={skill} value={skill}>
                                {skill}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" onClick={addSkill} disabled={!newSkill} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">지원 요구사항</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="팀원에게 바라는 점이나 필요한 경험을 작성해주세요"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 연락 방법 */}
              <Card>
                <CardHeader>
                  <CardTitle>연락 방법</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>연락 방법</Label>
                    <Select
                      value={formData.contactMethod}
                      onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platform">플랫폼 내 메시지</SelectItem>
                        <SelectItem value="email">이메일</SelectItem>
                        <SelectItem value="kakao">카카오톡</SelectItem>
                        <SelectItem value="discord">디스코드</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.contactMethod !== "platform" && (
                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">연락처</Label>
                      <Input
                        id="contactInfo"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        placeholder={
                          formData.contactMethod === "email" ? "이메일 주소" :
                          formData.contactMethod === "kakao" ? "카카오톡 ID" :
                          "디스코드 ID"
                        }
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 팀장 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle>팀장 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold text-xl">{user.name[0]}</span>
                    </div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600 mt-1">{user.location || "위치 미설정"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* 설정 */}
              <Card>
                <CardHeader>
                  <CardTitle>팀 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPublic"
                      checked={formData.isPublic}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked as boolean })}
                    />
                    <Label htmlFor="isPublic" className="text-sm">
                      팀을 공개적으로 표시
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowDirectApply"
                      checked={formData.allowDirectApply}
                      onCheckedChange={(checked) => setFormData({ ...formData, allowDirectApply: checked as boolean })}
                    />
                    <Label htmlFor="allowDirectApply" className="text-sm">
                      직접 지원 허용
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* 제출 버튼 */}
              <Card>
                <CardContent className="p-4">
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        생성 중...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        팀 만들기
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    팀 생성 후 언제든지 수정할 수 있습니다
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default function TeamCreatePage() {
  return (
    <ProtectedRoute>
      <TeamCreateContent />
    </ProtectedRoute>
  )
}