"use client"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  X,
  Plus,
  Upload,
  Save,
  ArrowRight,
  CheckCircle,
  Loader2,
  User,
  Heart,
  Code,
  MapPin,
  Sparkles,
  SkipBackIcon as Skip,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"

const availableInterests = [
  "창업",
  "IT",
  "디자인",
  "마케팅",
  "광고",
  "사회",
  "환경",
  "교육",
  "문화",
  "예술",
  "스포츠",
  "의료",
  "금융",
  "정책",
]

const availableSkills = [
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "UI/UX",
  "Figma",
  "Photoshop",
  "Illustrator",
  "Marketing",
  "SEO",
  "Data Analysis",
  "Machine Learning",
]

const regions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
]

export default function SignupProfilePage() {
    
  const { user, updateUser, updateProfile } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [profile, setProfile] = useState({
    bio: "",
    location: "",
    interests: [] as string[],
    skills: [] as string[],
    education: "",
    experience: "",
    portfolio: "",
    github: "",
  })

  const [newInterest, setNewInterest] = useState("")
  const [newSkill, setNewSkill] = useState("")




  const handleSave = async () => {
    setIsLoading(true)
    setSuccess(false)

    try {
        // 실제 API 호출 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 1500))
        
       const result = updateProfile(profile)
        if(!result){
            console.log("프로필 저장/수정 오류")
            setSuccess(false)
        }

        //setProfile(profile)
      // 사용자 정보 업데이트
    //   updateUser({
    //     //location: profile.location,
    //     //interests: profile.interests,
    //     //skills: profile.skills,
    //   })
        console.log("프로필 저장/수정 완료")
        setSuccess(true)

    //     // 2초 후 홈으로 이동
    //     setTimeout(() => {
    //     router.push("/")
    //   }, 2000)
    } catch (error) {
      console.error("프로필 저장 오류:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/")
  }

  const addInterest = (interest: string) => {
    if (interest && !profile.interests.includes(interest)) {
      setProfile({
        ...profile,
        interests: [...profile.interests, interest],
      })
    }
    setNewInterest("")
  }

  const removeInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter((i) => i !== interest),
    })
  }

  const addSkill = (skill: string) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, skill],
      })
    }
    setNewSkill("")
  }

  const removeSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    })
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!user) {
    console.log("사용자 정보가 없습니다.")
        // 2초 후 홈으로 이동
        setTimeout(() => {            
        router.push("/")
      }, 2000)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">로딩 중...</h3>
            <p className="text-gray-600">사용자 정보를 확인하고 있습니다.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">프로필 설정 완료!</h2>
              <p className="text-gray-600 mb-6">
                프로필이 성공적으로 저장되었습니다.
                <br />
                이제 맞춤 공모전 추천을 받아보세요!
              </p>
              <div className="flex gap-2">
                <Link href="/ai-recommend" className="flex-1">
                  <Button className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI 추천받기
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    홈으로
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">프로필 설정</h1>
          <p className="text-gray-600">{user.username}님만의 프로필을 만들어 더 정확한 공모전 추천을 받아보세요</p>
        </div>

        {/* 진행 단계 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"
                }`}
              >
                1
              </div>
              <span className={`ml-2 text-sm font-medium ${currentStep >= 1 ? "text-blue-600" : "text-gray-500"}`}>
                기본정보
              </span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"
                }`}
              >
                2
              </div>
              <span className={`ml-2 text-sm font-medium ${currentStep >= 2 ? "text-blue-600" : "text-gray-500"}`}>
                관심사
              </span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"
                }`}
              >
                3
              </div>
              <span className={`ml-2 text-sm font-medium ${currentStep >= 3 ? "text-blue-600" : "text-gray-500"}`}>
                추가정보
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* 1단계: 기본 정보 */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  기본 정보
                </CardTitle>
                <p className="text-sm text-gray-600">기본적인 프로필 정보를 입력해주세요</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 프로필 사진 */}
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={/*user.avatar || */"/placeholder.svg"} alt={user.username} />
                    <AvatarFallback className="text-2xl">{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" disabled className="bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    사진 업로드 (준비중)
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG 파일만 업로드 가능합니다</p>
                </div>

                {/* 자기소개 */}
                <div className="space-y-2">
                  <Label htmlFor="bio">자기소개</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="자신을 간단히 소개해주세요..."
                    rows={4}
                  />
                  <p className="text-xs text-gray-500">팀원들에게 보여질 소개글입니다</p>
                </div>

                {/* 지역 */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    활동 지역
                  </Label>
                  <Select
                    value={profile.location}
                    onValueChange={(value) => setProfile({ ...profile, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="지역을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">주로 활동하는 지역을 선택해주세요</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handleSkip} className="flex-1 bg-transparent">
                    <Skip className="w-4 h-4 mr-2" />
                    나중에 설정
                  </Button>
                  <Button onClick={nextStep} className="flex-1">
                    다음 단계
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 2단계: 관심사 */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  관심 분야 & 기술 스택
                </CardTitle>
                <p className="text-sm text-gray-600">관심 있는 분야와 보유 기술을 선택해주세요</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 관심 분야 */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">관심 분야</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                        {interest}
                        <button
                          onClick={() => removeInterest(interest)}
                          className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Select value={newInterest} onValueChange={setNewInterest}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="관심 분야 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableInterests
                          .filter((interest) => !profile.interests.includes(interest))
                          .map((interest) => (
                            <SelectItem key={interest} value={interest}>
                              {interest}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={() => addInterest(newInterest)} disabled={!newInterest} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">관심 있는 공모전 분야를 선택해주세요</p>
                </div>

                {/* 기술 스택 */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">기술 스택</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="flex items-center gap-1">
                        {skill}
                        <button
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
                          .filter((skill) => !profile.skills.includes(skill))
                          .map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={() => addSkill(newSkill)} disabled={!newSkill} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">보유하고 있는 기술이나 도구를 선택해주세요</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                    이전 단계
                  </Button>
                  <Button onClick={nextStep} className="flex-1">
                    다음 단계
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 3단계: 추가 정보 */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  추가 정보
                </CardTitle>
                <p className="text-sm text-gray-600">선택사항입니다. 더 자세한 프로필을 만들어보세요</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="education">학력</Label>
                    <Input
                      id="education"
                      value={profile.education}
                      onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                      placeholder="예: 컴퓨터공학과 학사"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">경력</Label>
                    <Input
                      id="experience"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      placeholder="예: 프론트엔드 개발자 2년"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">포트폴리오 URL</Label>
                    <Input
                      id="portfolio"
                      value={profile.portfolio}
                      onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                      placeholder="https://portfolio.example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      value={profile.github}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                {/* 프로필 완성도 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">프로필 완성도</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>기본 정보</span>
                      <span className="text-blue-600">{profile.bio && profile.location ? "완료" : "미완료"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>관심사 & 기술</span>
                      <span className="text-blue-600">
                        {profile.interests.length > 0 || profile.skills.length > 0 ? "완료" : "미완료"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>추가 정보</span>
                      <span className="text-blue-600">
                        {profile.education || profile.experience || profile.portfolio || profile.github
                          ? "완료"
                          : "선택사항"}
                      </span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    프로필을 더 자세히 작성할수록 더 정확한 공모전 추천을 받을 수 있습니다!
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                    이전 단계
                  </Button>
                  <Button onClick={handleSave} disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        저장 중...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        프로필 저장
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 건너뛰기 안내 */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 mb-2">프로필은 언제든지 마이페이지에서 수정할 수 있습니다</p>
            <Button variant="ghost" onClick={handleSkip} className="text-sm">
              지금은 건너뛰고 서비스 이용하기
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
