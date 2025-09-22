"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Store, Moon, Sun } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleRoleSelect = async (role: string) => {
    setSelectedRole(role)
    await axios.post('/api/set-role', {
      role
    })
    
    if (role == 'customer') {
      router.push('/dashboard/c_dashboard');
    } else if (role == 'seller') {
      router.push('/dashboard/s_dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Dark mode toggle button */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-0 right-4 p-2 rounded-full bg-card border-border border hover:bg-accent transition-colors z-20"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-accent-foreground" />
        ) : (
          <Moon className="w-5 h-5 text-foreground" />
        )}
      </button>

      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-90 dark:opacity-95" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            Choose your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse-glow">
              role
            </span>
          </h1>
          <p className="text-muted-foreground text-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {"Welcome to ArtKart - Your creative marketplace"}
          </p>
        </div>

        <div className="space-y-6">
          <Card
            className="p-6 bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer animate-fade-in-up group dark:bg-card/80 dark:hover:border-primary/80"
            style={{ animationDelay: "0.4s" }}
            onClick={() => handleRoleSelect("customer")}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors dark:bg-primary/20">
                <User className="w-8 h-8 text-primary dark:text-primary/90" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-card-foreground mb-2 dark:text-card-foreground/90">
                  Customer
                </h3>
                <p className="text-muted-foreground dark:text-muted-foreground/80">
                  {"Discover and purchase unique artworks from talented artists"}
                </p>
              </div>
            </div>
            <Button
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 dark:bg-primary/90 dark:hover:bg-primary"
              size="lg"
            >
              {"Continue as Customer"}
            </Button>
          </Card>

          <Card
            className="p-6 bg-card border-border hover:border-accent transition-all duration-300 cursor-pointer animate-fade-in-up group dark:bg-card/80 dark:hover:border-accent/80"
            style={{ animationDelay: "0.6s" }}
            onClick={() => handleRoleSelect("seller")}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors dark:bg-accent/20">
                <Store className="w-8 h-8 text-accent dark:text-accent/90" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-card-foreground mb-2 dark:text-card-foreground/90">
                  Seller
                </h3>
                <p className="text-muted-foreground dark:text-muted-foreground/80">
                  {"Showcase and sell your creative works to art enthusiasts"}
                </p>
              </div>
            </div>
            <Button
              className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-3 dark:bg-accent/90 dark:hover:bg-accent"
              size="lg"
            >
              {"Continue as Seller"}
            </Button>
          </Card>
        </div>

        <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <p className="text-muted-foreground text-sm dark:text-muted-foreground/80">
            {"You can always switch roles later in your profile settings"}
          </p>
        </div>
      </div>
    </div>
  )
}