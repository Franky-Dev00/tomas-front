
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "./login"
import { NewUser } from "./new-user"

export default function AuthTabs() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Bienvenido</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="space-y-4">
                <Login />
              </TabsContent>
              <TabsContent value="register" className="space-y-4">
                <NewUser />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
