"use client"

import type React from "react"
import { 
  FormSubmitEvent, 
  InputChangeEvent, 
  TextareaChangeEvent,
  SelectChangeEvent,
  ButtonClickEvent 
} from "../types/events"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Medal,
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Check,
  Menu,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { WavyBackground } from "@/components/ui/wavy-background"
import { SparklesCore } from "@/components/ui/sparkles"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false)
  const [quickReservationData, setQuickReservationData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleReserveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsReservationDialogOpen(true)
  }

  const handleQuickReservationSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...quickReservationData,
          type: 'reservation'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send notification')
      }

      setIsSubmitting(false)
      setIsReservationDialogOpen(false)
      setQuickReservationData({
        name: "",
        phone: "",
        email: "",
        course: "",
      })

      toast({
        title: "Seat Reserved Successfully!",
        description: "We've received your reservation request. Our team will contact you shortly.",
        variant: "default",
        duration: 5000,
      })
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "Failed to send reservation request. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  const handleFormChange = (e: InputChangeEvent | TextareaChangeEvent | SelectChangeEvent) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'enquiry'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send notification')
      }

      setIsSubmitting(false)
      toast({
        title: "Form Submitted Successfully!",
        description: (
          <div className="flex flex-col space-y-2">
            <p>Thank you for your interest in Topper Mantra!</p>
            <p>We've sent a notification to the admin with your details.</p>
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              <span>Admin has been notified</span>
            </div>
          </div>
        ),
        variant: "default",
        duration: 5000,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      })
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Toaster />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Topper Mantra
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              About
            </Link>
            <Link
              href="#courses"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Courses
            </Link>
            <Link
              href="#guidance"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                document.getElementById("guidance")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Special Guidance
            </Link>
            <Link
              href="#location"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                document.getElementById("location")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Location
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/90 dark:to-pink-950/90"
            >
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="#about"
                  className="text-lg font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/20"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                      ; (document.querySelector("[data-radix-collection-item]") as HTMLButtonElement)?.click() // Close the sheet
                    return
                  }}
                >
                  About
                </Link>
                <Link
                  href="#courses"
                  className="text-lg font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/20"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })
                      ; (document.querySelector("[data-radix-collection-item]") as HTMLButtonElement)?.click() // Close the sheet
                    return
                  }}
                >
                  Courses
                </Link>
                <Link
                  href="#guidance"
                  className="text-lg font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/20"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    document.getElementById("guidance")?.scrollIntoView({ behavior: "smooth" })
                      ; (document.querySelector("[data-radix-collection-item]") as HTMLButtonElement)?.click() // Close the sheet
                    return
                  }}
                >
                  Special Guidance
                </Link>
                <Link
                  href="#location"
                  className="text-lg font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/20"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    document.getElementById("location")?.scrollIntoView({ behavior: "smooth" })
                      ; (document.querySelector("[data-radix-collection-item]") as HTMLButtonElement)?.click() // Close the sheet
                    return
                  }}
                >
                  Location
                </Link>
                <Link
                  href="#contact"
                  className="text-lg font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/20"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                      ; (document.querySelector("[data-radix-collection-item]") as HTMLButtonElement)?.click() // Close the sheet
                    return
                  }}
                >
                  Contact
                </Link>
                <Button
                  className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handleReserveClick(e)
                      ; (document.querySelector("[data-radix-collection-item]") as HTMLButtonElement)?.click() // Close the sheet
                    return
                  }}
                >
                  Reserve Your Seat
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          <Button
            className="hidden md:inline-flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={handleReserveClick}
          >
            Reserve Your Seat
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#8B5CF6"
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white shadow-lg animate-pulse">
                  Learn from the Best!
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                  Topper Mantra by D.B. DUBEY Sir
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join one of Delhi&apos;s most trusted coaching institutes, led by the highly qualified and experienced
                  Deepak Bhardwaj Sir — a gold medalist and top ranker in UGC NET with over a decade of teaching
                  excellence.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg group"
                    onClick={handleReserveClick}
                  >
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950 transition-all duration-300"
                  >
                    <Link href="#about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm overflow-hidden rounded-xl border bg-background p-6 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute right-2 top-2">
                    <Medal className="h-6 w-6 text-yellow-500 animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                      New Batch Starting Soon!
                    </h3>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4 text-pink-500" />
                      <span>1st April 2025</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Limited seats available. Reserve your spot now to secure your place in our upcoming batch.
                    </p>
                    <div className="pt-3">
                      <Button
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                        onClick={handleReserveClick}
                      >
                        Reserve Your Seat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 relative">
          <WavyBackground className="absolute inset-0 z-0" colors={["#8b5cf6", "#ec4899", "#c084fc"]} />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900 px-3 py-1 text-sm font-medium text-purple-800 dark:text-purple-300 shadow-md">
                  About The Instructor
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Meet D.B. DUBEY Sir
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A gold medalist and top ranker in UGC NET with over a decade of teaching excellence
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="flex justify-center">
                <div className="relative h-[350px] w-[300px] overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center p-6">
                      <GraduationCap className="h-24 w-24 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white">D.B. DUBEY</h3>
                      <p className="text-white/80 mt-2">Expert Educator</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  Qualifications & Achievements
                </h3>
                <ul className="grid gap-3">
                  <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <span>M.Sc. (Jamia Millia Islamia)</span>
                  </li>
                  <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <span>M.Ed. (IGNOU)</span>
                  </li>
                  <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20">
                      <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                    </div>
                    <span>B.Sc. (Gold Medalist - M.D.U)</span>
                  </li>
                  <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20">
                      <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                    </div>
                    <span>UGC NET with JRF, AIR 65 (1st attempt)</span>
                  </li>
                  <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <span>10+ Years of Teaching Experience</span>
                  </li>
                  <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20">
                      <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                    </div>
                    <span>Cleared CTET, HTET, DSSSB, RRB, UP TGT, NVS TGT (All in 1st attempt)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="courses"
          className="w-full py-12 md:py-24 lg:py-32 bg-purple-50 dark:bg-purple-950/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <FloatingParticles className="w-full h-full" particleColor="#a855f7" quantity={20} />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900 px-3 py-1 text-sm font-medium text-purple-800 dark:text-purple-300 shadow-md">
                  Classes Offered
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Our Courses
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive courses designed to help students excel in their academics
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden border-purple-200 dark:border-purple-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg" />
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">8th to 10th Grade</CardTitle>
                  <CardDescription>Foundation courses for middle school students</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center transform transition-all duration-300 hover:translate-x-1">
                      <BookOpen className="mr-2 h-4 w-4 text-pink-500" />
                      <span>Science</span>
                    </li>
                    <li className="flex items-center transform transition-all duration-300 hover:translate-x-1">
                      <BookOpen className="mr-2 h-4 w-4 text-purple-500" />
                      <span>Mathematics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-purple-200 dark:border-purple-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg" />
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">11th Grade</CardTitle>
                  <CardDescription>Preparing students for higher education</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center transform transition-all duration-300 hover:translate-x-1">
                      <BookOpen className="mr-2 h-4 w-4 text-pink-500" />
                      <span>Physics</span>
                    </li>
                    <li className="flex items-center transform transition-all duration-300 hover:translate-x-1">
                      <BookOpen className="mr-2 h-4 w-4 text-purple-500" />
                      <span>Chemistry</span>
                    </li>
                    <li className="flex items-center transform transition-all duration-300 hover:translate-x-1">
                      <BookOpen className="mr-2 h-4 w-4 text-pink-500" />
                      <span>Mathematics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-purple-200 dark:border-purple-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg" />
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">12th Grade</CardTitle>
                  <CardDescription>Comprehensive preparation for board exams</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center transform transition-all duration-300 hover:translate-x-1">
                      <BookOpen className="mr-2 h-4 w-4 text-pink-500" />
                      <span>Physics</span>
                    </li>
                    <li className="flex items-center transform transition-all duration-300 hover:translate-x-1">
                      <BookOpen className="mr-2 h-4 w-4 text-purple-500" />
                      <span>Chemistry</span>
                    </li>
                    <li className="flex items-center transform transition-all duration-300 hover:translate-x-1">
                      <BookOpen className="mr-2 h-4 w-4 text-pink-500" />
                      <span>Mathematics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="guidance" className="w-full py-12 md:py-24 lg:py-32 relative">
          <BackgroundBeams className="absolute inset-0 z-0" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900 px-3 py-1 text-sm font-medium text-purple-800 dark:text-purple-300 shadow-md">
                  Special Guidance
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Competitive Exam Preparation
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Special guidance available for various competitive entrance exams
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center text-center p-6 border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-black/50 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <GraduationCap className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">IIT JEE</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Comprehensive preparation for Joint Entrance Examination
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-6 border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-black/50 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <GraduationCap className="h-12 w-12 text-pink-600 dark:text-pink-400 mb-4" />
                <h3 className="text-xl font-bold text-pink-700 dark:text-pink-300">NEET</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Specialized coaching for medical entrance examination
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-6 border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-black/50 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <GraduationCap className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">CUET</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Expert guidance for Common University Entrance Test
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-6 border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-black/50 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <GraduationCap className="h-12 w-12 text-pink-600 dark:text-pink-400 mb-4" />
                <h3 className="text-xl font-bold text-pink-700 dark:text-pink-300">NDA</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Specialized preparation for National Defence Academy exam
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-6 md:col-span-2 lg:col-span-2 border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-black/50 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <div className="flex items-center justify-center mb-4">
                  <GraduationCap className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                  <Sparkles className="h-8 w-8 text-pink-500 ml-1" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Other Competitive Exams
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Customized coaching for various other competitive examinations
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                  New Batch Starting Soon!
                </h2>
                <p className="text-white/80 md:text-xl">
                  Join our upcoming batch starting on 1st April 2025. Limited seats available!
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-purple-600 hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 group"
                    onClick={handleReserveClick}
                  >
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Card className="w-full max-w-sm bg-white/95 text-foreground backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Why Join Topper Mantra?</CardTitle>
                    <CardDescription>Experience the difference with our expert guidance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3">
                      <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                        <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        </div>
                        <span>Expert faculty with proven track record</span>
                      </li>
                      <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                        <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20">
                          <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                        </div>
                        <span>Comprehensive study material</span>
                      </li>
                      <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                        <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        </div>
                        <span>Regular tests and assessments</span>
                      </li>
                      <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                        <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20">
                          <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                        </div>
                        <span>Personalized attention to each student</span>
                      </li>
                      <li className="flex items-start transform transition-all duration-300 hover:translate-x-1">
                        <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        </div>
                        <span>Proven success rate in competitive exams</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
            <FloatingParticles className="w-full h-full" particleColor="#d946ef" quantity={15} />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900 px-3 py-1 text-sm font-medium text-purple-800 dark:text-purple-300 shadow-md">
                  Our Location
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Visit Our Institute
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conveniently located in Badarpur, New Delhi
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start transform transition-all duration-500 hover:translate-x-1 p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm hover:shadow-md">
                  <MapPin className="mr-2 h-5 w-5 text-purple-500" />
                  <div>
                    <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300">Address</h3>
                    <p className="text-muted-foreground">
                      1st Floor, Gali No. 1, near Shiv Mandir, Om Market, Om Nagar, Meethapur, Badarpur, New Delhi -
                      110044
                    </p>
                  </div>
                </div>
                <div className="flex items-start transform transition-all duration-300 p-4 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm hover:shadow-md hover:translate-x-1">
                  <Phone className="mr-2 h-5 w-5 text-pink-500" />
                  <div>
                    <h3 className="text-lg font-bold text-pink-700 dark:text-pink-300">Contact</h3>
                    <p className="text-muted-foreground">Call: 8700311143</p>
                    <a
                      href="https://wa.me/918700311143"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center px-3 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
                    >
                      <MessageCircle className="mr-1 h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              <div className="aspect-video rounded-xl border border-purple-200 dark:border-purple-800 overflow-hidden relative bg-purple-50 dark:bg-purple-950/30 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2 p-4">
                    <MapPin className="h-12 w-12 text-purple-500 mx-auto animate-bounce" />
                    <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">Visit Us Today</h3>
                    <p className="text-muted-foreground">
                      Conveniently located in Badarpur, our institute is easily accessible by public transport.
                    </p>
                    <Button
                      className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md"
                      onClick={() => {
                        window.open("https://www.google.com/maps/dir/?api=1&destination=1st+Floor,+Gali+No.+1,+near+Shiv+Mandir,+Om+Market,+Om+Nagar,+Meethapur,+Badarpur,+New+Delhi+-+110044", "_blank");
                      }}
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <WavyBackground className="w-full h-full" colors={["#c084fc10", "#e879f910", "#c084fc05"]} />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900 px-3 py-1 text-sm font-medium text-purple-800 dark:text-purple-300 shadow-md">
                  Contact Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Reserve Your Seat
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Limited seats available for our upcoming batch starting on 1st April 2025
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card className="border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-black/20 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">Get in Touch</CardTitle>
                  <CardDescription>
                    Fill out the form below to reserve your seat or inquire about our courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4" onSubmit={handleFormSubmit}>
                    <div className="grid gap-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="course"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Course Interested In
                      </label>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleFormChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select a course</option>
                        <option value="8th-10th">8th & 10th Grade</option>
                        <option value="11th">11th Grade</option>
                        <option value="12th">12th Grade</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter any additional information or questions"
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          <span className="mr-1">Submit Application</span>
                          <Sparkles className="h-4 w-4 transition-all group-hover:scale-110" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <div className="space-y-6">
                <Card className="border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-black/20 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-purple-700 dark:text-purple-300">Contact Information</CardTitle>
                    <CardDescription>Reach out to us directly</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="mr-2 h-5 w-5 text-pink-500" />
                      <div>
                        <h3 className="text-sm font-medium">Phone/WhatsApp</h3>
                        <p className="text-sm text-muted-foreground">8700311143</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MessageCircle className="mr-2 h-5 w-5 text-green-500" />
                      <div>
                        <h3 className="text-sm font-medium">WhatsApp</h3>
                        <a
                          href="https://wa.me/918700311143"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 flex items-center"
                        >
                          Chat with us
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="mr-2 h-5 w-5 text-purple-500" />
                      <div>
                        <h3 className="text-sm font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">deepakbhardwajdube123@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="mr-2 h-5 w-5 text-pink-500" />
                      <div>
                        <h3 className="text-sm font-medium">Address</h3>
                        <p className="text-sm text-muted-foreground">
                          1st Floor, Gali No. 1, near Shiv Mandir, Om Market, Om Nagar, Meethapur, Badarpur, New Delhi -
                          110044
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-black/20 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-purple-700 dark:text-purple-300">Batch Details</CardTitle>
                    <CardDescription>Information about our upcoming batch</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="mr-2 h-5 w-5 text-pink-500" />
                      <div>
                        <h3 className="text-sm font-medium">Start Date</h3>
                        <p className="text-sm text-muted-foreground">1st April 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Class Size</h3>
                        <p className="text-sm text-muted-foreground">Limited to 30 students per batch</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20">
                        <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Duration</h3>
                        <p className="text-sm text-muted-foreground">Classes will be held 6 days a week</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Topper Mantra
            </span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Topper Mantra. All rights reserved.
          </p>
          <a
            href="https://wa.me/918700311143"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
          >
            <MessageCircle className="mr-1 h-4 w-4" />
            WhatsApp Us
          </a>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-pink-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>

      {/* Quick Reservation Dialog */}
      <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Reserve Your Seat
            </DialogTitle>
            <DialogDescription>
              Fill in your details below to reserve a seat in our upcoming batch starting on 1st April 2025.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleQuickReservationSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="quick-name">Name</Label>
                <Input
                  id="quick-name"
                  value={quickReservationData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuickReservationData({ ...quickReservationData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quick-phone">Phone</Label>
                <Input
                  id="quick-phone"
                  type="tel"
                  value={quickReservationData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuickReservationData({ ...quickReservationData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quick-email">Email</Label>
                <Input
                  id="quick-email"
                  type="email"
                  value={quickReservationData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuickReservationData({ ...quickReservationData, email: e.target.value })}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quick-course">Course Interested In</Label>
                <select
                  id="quick-course"
                  value={quickReservationData.course}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setQuickReservationData({ ...quickReservationData, course: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select a course</option>
                  <option value="8th-10th">8th & 10th Grade</option>
                  <option value="11th">11th Grade</option>
                  <option value="12th">12th Grade</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Reserve My Seat"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

