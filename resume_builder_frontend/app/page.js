"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 px-4">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Create Your Perfect Resume in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build a professional resume with our intelligent resume builder.
              Choose from beautiful templates, customize your content, and
              download instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  href="/templates"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition inline-block"
                >
                  Start Building
                </Link>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition inline-block"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="/login"
                    className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition inline-block"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-16">
              Why Choose ResumeBuilder?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Lightning Fast
                </h3>
                <p className="text-muted-foreground">
                  Create a professional resume in just minutes with our
                  intuitive interface and smart suggestions.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Beautiful Templates
                </h3>
                <p className="text-muted-foreground">
                  Choose from professionally designed templates that are proven
                  to impress recruiters and hiring managers.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Always Accessible
                </h3>
                <p className="text-muted-foreground">
                  Edit your resume anytime, anywhere. Access your work from any
                  device with cloud sync.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-16">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  desc: "Create your free account in seconds",
                },
                {
                  step: "2",
                  title: "Fill Information",
                  desc: "Enter your professional details",
                },
                {
                  step: "3",
                  title: "Choose Template",
                  desc: "Select from beautiful designs",
                },
                {
                  step: "4",
                  title: "Download",
                  desc: "Export as PDF and apply to jobs",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of job seekers who've already created their perfect
              resumes.
            </p>
            {!isAuthenticated && (
              <Link
                href="/signup"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
              >
                Create Your Resume Now
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
