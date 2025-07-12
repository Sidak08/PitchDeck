import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, Target, Heart } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Former McKinsey consultant with a passion for empowering the next generation of business leaders.",
  },
  {
    name: "Michael Chen",
    role: "Head of Product",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Ex-Google product manager who believes in the power of case competitions to develop critical thinking.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Partnerships",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Former investment banker who connects top business schools with talented high school students.",
  },
]

const values = [
  {
    icon: Trophy,
    title: "Excellence",
    description: "We strive for the highest standards in everything we do, from our platform to our competitions.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive network of students, educators, and business professionals.",
  },
  {
    icon: Target,
    title: "Opportunity",
    description: "Creating pathways for talented students to showcase their skills and connect with top institutions.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Driven by our love for business education and student development.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="gradient-text">The Pitch Deck</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            We're on a mission to democratize access to business case competitions and empower the next generation of
            leaders.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Pitch Deck was founded with a simple belief: every talented high school student should have access
                to world-class business case competitions, regardless of their background or connections.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We've created the first comprehensive platform that connects students with opportunities, provides the
                tools they need to succeed, and builds a community of future business leaders.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Students Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Partner Schools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$100K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Prize Money</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Students collaborating"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do and shape the experience we create for our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're a passionate team of educators, entrepreneurs, and former consultants dedicated to student success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600 dark:text-gray-300">
            <p className="mb-6">
              The Pitch Deck was born from a simple observation: while business case competitions were transforming
              students' lives at the university level, high school students had limited access to these opportunities.
            </p>
            <p className="mb-6">
              Our founder, Sarah Johnson, experienced firsthand how case competitions at Harvard Business School shaped
              her career trajectory. She realized that if these experiences could be made available to high school
              students, it could level the playing field and open doors for talented individuals regardless of their
              background.
            </p>
            <p className="mb-6">
              Today, The Pitch Deck has grown into the largest platform for high school case competitions, partnering
              with top business schools and organizations to provide students with unparalleled opportunities to develop
              their skills, build their networks, and launch their careers.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
