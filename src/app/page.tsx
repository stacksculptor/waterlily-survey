import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Shield, CheckCircle, TrendingUp, Users, Check } from "lucide-react"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-sight">
          Plan Your Long-Term Care Journey
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete our comprehensive survey to receive personalized insights into your long-term care needs, cost estimates, planning recommendations.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-medium">Secure & Private</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your personal information is encrypted and not shared with others
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-medium">AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Advanced machine learning algorithms analyze your responses to provide accurate cost projections.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-medium">Expert Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get recommendations based on industry expertise and support from professionals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* What We Collect Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</div>
                <span>Complete the comprehensive survey (10~15 minutes)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</div>
                <span>Review and edit your responses if necessary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</div>
                <span>Receive personalized insights and recommendations </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              What We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li>- Demographic information (age, gender, location)</li>
              <li>- Health status and medical history</li>
              <li>- Financial situation and insurance coverage</li>
              <li>- Family support and living arrangements</li>
            </ul>
            <p className="pt-2 text-xs">
              This information helps us provide accurate cost estimates and personalized recommendations for your long-term care planning needs.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <SignedOut>
          <p className="text-muted-foreground mb-4">
            Ready to start planning your future? Sign in to begin your survey
          </p>
          <SignInButton mode="modal">
            <Button size={"lg"}>Sign In to Start</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <p className="text-muted-foreground mb-4">
            Continue your long-term care planning Journey.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant={"outline"}>
              <Link href={"/responses"}>View My Responses</Link>
            </Button>
            <Button asChild>
              <Link href={"/survey"}>Take Survey</Link>
            </Button>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
