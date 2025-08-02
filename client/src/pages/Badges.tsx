import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Star, Award, MapPin, Clock, Zap, Target, Compass } from "lucide-react";

const Badges = () => {
  const earnedBadges: any[] = [];
  const availableBadges: any[] = [];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500";
      case "uncommon":
        return "bg-green-500";
      case "rare":
        return "bg-blue-500";
      case "epic":
        return "bg-purple-500";
      case "legendary":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Achievement Badges</h1>
          <p className="text-muted-foreground">
            Earn badges by maintaining safe driving habits and making smart travel decisions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">0</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-muted-foreground">0</div>
                <div className="text-sm text-muted-foreground">Total Available</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earned Badges */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Award className="text-primary" size={24} />
            Earned Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.length > 0 ? (
              earnedBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <Card key={badge.id} className="glass-card hover:shadow-lg transition-shadow group">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full ${badge.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon size={32} className={badge.color} />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                        <div className="flex items-center justify-center gap-2">
                          <Badge className={`${getRarityColor(badge.rarity)} text-white`}>
                            {badge.rarity}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Earned {badge.earnedDate}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center p-12 text-muted-foreground">
                <Award size={48} className="mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Badges Earned Yet</h3>
                <p>Start traveling safely to earn your first badges!</p>
              </div>
            )}
          </div>
        </div>

        {/* Badges in Progress */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Target className="text-accent" size={24} />
            Badges in Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableBadges.length > 0 ? (
              availableBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <Card key={badge.id} className="glass-card hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <Icon size={24} className="text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{badge.name}</CardTitle>
                          <CardDescription>{badge.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{badge.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">{badge.requirement}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center p-12 text-muted-foreground">
                <Target size={48} className="mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Badges Available</h3>
                <p>Badge challenges will appear as you use the app.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Badges;