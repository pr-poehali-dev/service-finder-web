import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { trackEvent } from '@/utils/analytics';

interface ProviderRegistrationProps {
  t: any;
  services: any[];
  lang: 'ru' | 'en' | 'tt';
}

export const ProviderRegistration = ({ t, services, lang }: ProviderRegistrationProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    experience: '',
    price: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('provider_registration', 'conversion', formData.service);
    setSubmitted(true);
    setTimeout(() => {
      alert(`Заявка принята!\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nУслуга: ${formData.service}\n\nМы свяжемся с вами в течение 24 часов для верификации.`);
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        service: '',
        experience: '',
        price: '',
        description: '',
      });
      setSubmitted(false);
    }, 500);
  };

  return (
    <section id="provider-registration" className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t.providerReg}</h2>
          <p className="text-xl text-muted-foreground">
            Зарегистрируйтесь как исполнитель и получайте заказы от клиентов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="UserCheck" className="text-blue-600" size={32} />
              </div>
              <CardTitle>Быстрая регистрация</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Заполните форму за 3 минуты и начните получать заказы
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="Shield" className="text-green-600" size={32} />
              </div>
              <CardTitle>Безопасность</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Все исполнители проходят верификацию для защиты клиентов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="TrendingUp" className="text-purple-600" size={32} />
              </div>
              <CardTitle>Больше заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Получайте заявки от тысяч клиентов в вашем городе
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Форма регистрации исполнителя</CardTitle>
            <CardDescription>Заполните все поля для успешной регистрации</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Полное имя *</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Иван Петров"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    required
                    type="email"
                    placeholder="ivan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Город *</Label>
                  <Input
                    id="city"
                    required
                    placeholder="Москва"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Услуга *</Label>
                  <Select
                    required
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={lang === 'ru' ? service.name_ru : lang === 'en' ? service.name_en : service.name_tt}>
                          {lang === 'ru' ? service.name_ru : lang === 'en' ? service.name_en : service.name_tt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Опыт работы (лет) *</Label>
                  <Input
                    id="experience"
                    required
                    type="number"
                    min="0"
                    placeholder="5"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Цена услуги (₽) *</Label>
                  <Input
                    id="price"
                    required
                    type="number"
                    min="0"
                    placeholder="1500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">О себе и услугах *</Label>
                <Textarea
                  id="description"
                  required
                  rows={5}
                  placeholder="Расскажите о своем опыте, квалификации и предоставляемых услугах..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Icon name="Info" className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-blue-900 mb-1">Верификация профиля</p>
                    <p className="text-sm text-blue-700">
                      После отправки заявки наши модераторы проверят ваши данные в течение 24 часов. 
                      Мы свяжемся с вами для подтверждения и активации профиля.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" className="mr-2" size={20} />
                    Зарегистрироваться как исполнитель
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="CheckCircle" className="text-green-600" size={24} />
                Преимущества
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  'Бесплатная регистрация и первый месяц',
                  'Гибкие тарифные планы',
                  'Прямые заказы от клиентов',
                  'Поддержка 24/7',
                  'Удобное управление заказами',
                  'Безопасные сделки',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Icon name="Check" className="text-green-600" size={20} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="DollarSign" className="text-blue-600" size={24} />
                Тарифы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-bold">Базовый</p>
                    <p className="text-sm text-muted-foreground">До 10 заявок/мес</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">500₽</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-500">
                  <div>
                    <p className="font-bold">Стандарт</p>
                    <p className="text-sm text-muted-foreground">До 50 заявок/мес</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">1200₽</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-bold">Премиум</p>
                    <p className="text-sm text-muted-foreground">Безлимит</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">2000₽</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
