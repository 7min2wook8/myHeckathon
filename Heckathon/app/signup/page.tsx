"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  })
  const [agreements, setAgreements] = useState({
    terms1: false,
    terms2: false,
    privacy: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    if (!agreements.terms1 || !agreements.terms2 || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.")
      return
    }
    // 회원가입 로직 구현
    console.log("회원가입 시도:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
              <p className="text-gray-600">소나니와 함께 시작해보세요</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">아이디</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="아이디를 입력하세요"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="전화번호를 입력하세요"
                    required
                  />
                </div>

                {/* 약관 동의 */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms1"
                      checked={agreements.terms1}
                      onCheckedChange={(checked) => setAgreements({ ...agreements, terms1: checked as boolean })}
                    />
                    <Label htmlFor="terms1" className="text-sm">
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        이용약관 1
                      </Link>
                      에 동의합니다 (필수)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms2"
                      checked={agreements.terms2}
                      onCheckedChange={(checked) => setAgreements({ ...agreements, terms2: checked as boolean })}
                    />
                    <Label htmlFor="terms2" className="text-sm">
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        이용약관 2
                      </Link>
                      에 동의합니다 (필수)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={agreements.privacy}
                      onCheckedChange={(checked) => setAgreements({ ...agreements, privacy: checked as boolean })}
                    />
                    <Label htmlFor="privacy" className="text-sm">
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        개인정보처리방침
                      </Link>
                      에 동의합니다 (필수)
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  회원가입
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  이미 계정이 있으신가요?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    로그인
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
