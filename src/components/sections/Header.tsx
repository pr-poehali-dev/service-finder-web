import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HeaderProps {
  lang: 'ru' | 'en' | 'tt';
  setLang: (lang: 'ru' | 'en' | 'tt') => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  handleShare: () => void;
  t: any;
  providersData: any[];
  services: any[];
  pricingPlans: any[];
}

export const Header = ({
  lang,
  setLang,
  favorites,
  toggleFavorite,
  handleShare,
  t,
  providersData,
  services,
  pricingPlans,
}: HeaderProps) => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ServiceHub
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="Heart" size={20} />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {favorites.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-semibold">{t.favorites}</h4>
                  {favorites.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t.noFavorites}</p>
                  ) : (
                    <div className="space-y-2">
                      {providersData.filter(p => favorites.includes(p.id)).map(provider => (
                        <div key={provider.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{provider.name}</p>
                            <p className="text-xs text-muted-foreground">{provider.service}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => toggleFavorite(provider.id)}>
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Icon name="Share2" size={20} />
            </Button>

            <Select value={lang} onValueChange={(v) => setLang(v as 'ru' | 'en' | 'tt')}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="tt">Татарча</SelectItem>
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">{t.login}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.login}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Password" type="password" />
                  <Button className="w-full">{t.login}</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>{t.register}</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t.register}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="client" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="client">{t.forClients}</TabsTrigger>
                    <TabsTrigger value="provider">{t.forProviders}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="client" className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="font-semibold">{t.clientReg}</span>
                      <Badge className="bg-green-500">{t.free}</Badge>
                    </div>
                    <Input placeholder="Имя" />
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Телефон" />
                    <Input placeholder="Пароль" type="password" />
                    <Button className="w-full">{t.register}</Button>
                  </TabsContent>
                  <TabsContent value="provider" className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
                      <h3 className="text-xl font-bold mb-2">{t.freeTrialMonths}</h3>
                      <p className="text-sm text-muted-foreground">Затем выберите удобный тариф</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {pricingPlans.map((plan) => (
                        <Card key={plan.name} className={plan.name === 'standard' ? 'border-primary border-2' : ''}>
                          <CardHeader>
                            <CardTitle className="capitalize">{t[plan.name as keyof typeof t]}</CardTitle>
                            <CardDescription className="text-3xl font-bold text-primary">
                              {plan.price}₽<span className="text-sm text-muted-foreground">{t.perMonth}</span>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                  <Icon name="Check" size={16} className="text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Input placeholder="Имя" />
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Телефон" />
                    <Input placeholder="Город" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t.chooseService} />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.id} value={s.id.toString()}>
                            {lang === 'ru' ? s.name_ru : lang === 'en' ? s.name_en : s.name_tt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input placeholder="Пароль" type="password" />
                    <Button className="w-full">{t.register}</Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
};
