import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

interface ProvidersSectionProps {
  t: any;
  filteredProviders: any[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  minRating: number[];
  setMinRating: (rating: number[]) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  resetFilters: () => void;
}

export const ProvidersSection = ({
  t,
  filteredProviders,
  favorites,
  toggleFavorite,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  selectedDate,
  setSelectedDate,
  resetFilters,
}: ProvidersSectionProps) => {
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);

  const GOOGLE_MAPS_API_KEY = 'AIzaSyDLHyHzu2YCd87FVwRDAH59XdphxN8t3W4';

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">{t.nearYou}</h2>
            <p className="text-muted-foreground mt-2">
              {t.found} {filteredProviders.length} {t.providers}
            </p>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="lg">
                <Icon name="SlidersHorizontal" className="mr-2" size={20} />
                {t.filters}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium">{t.priceRange}</label>
                    <span className="text-sm text-muted-foreground">
                      {priceRange[0]}₽ - {priceRange[1]}₽
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={3000}
                    step={100}
                    className="mb-4"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium">{t.minRating}</label>
                    <span className="text-sm text-muted-foreground">
                      {minRating[0].toFixed(1)} ⭐
                    </span>
                  </div>
                  <Slider
                    value={minRating}
                    onValueChange={setMinRating}
                    min={0}
                    max={5}
                    step={0.1}
                    className="mb-4"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t.selectDate}</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    locale={ru}
                    className="rounded-md border"
                  />
                  {selectedDate && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Выбрано: {format(selectedDate, 'dd MMMM yyyy', { locale: ru })}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={resetFilters} variant="outline" className="flex-1">
                    {t.resetFilters}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {filteredProviders.map((provider) => (
              <Card 
                key={provider.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${selectedProvider === provider.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedProvider(provider.id)}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                        {provider.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl mb-1">{provider.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(provider.id);
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            className={favorites.includes(provider.id) ? "fill-red-500 text-red-500" : ""}
                            size={20} 
                          />
                        </Button>
                      </div>
                      <CardDescription>{provider.service}</CardDescription>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{provider.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({provider.reviews} {t.reviews})
                          </span>
                        </div>
                        <Badge variant="outline">
                          <Icon name="MapPin" size={12} className="mr-1" />
                          {provider.city}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{t.from}</div>
                      <div className="text-2xl font-bold text-primary">{provider.price}₽</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Icon name="MessageCircle" className="mr-2" size={18} />
                    Написать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 h-[600px] rounded-2xl overflow-hidden shadow-xl">
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
              <Map
                defaultCenter={{ lat: 55.7558, lng: 37.6173 }}
                defaultZoom={12}
                mapId="service-hub-map"
                gestureHandling="greedy"
                disableDefaultUI={false}
              >
                {filteredProviders.map((provider) => (
                  <AdvancedMarker
                    key={provider.id}
                    position={{ lat: provider.lat, lng: provider.lng }}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <Pin
                      background={selectedProvider === provider.id ? '#0ea5e9' : '#3b82f6'}
                      glyphColor={'#fff'}
                      borderColor={'#1e40af'}
                      scale={selectedProvider === provider.id ? 1.3 : 1}
                    />
                  </AdvancedMarker>
                ))}

                {selectedProvider && filteredProviders.find(p => p.id === selectedProvider) && (
                  <InfoWindow
                    position={{
                      lat: filteredProviders.find(p => p.id === selectedProvider)!.lat,
                      lng: filteredProviders.find(p => p.id === selectedProvider)!.lng
                    }}
                    onCloseClick={() => setSelectedProvider(null)}
                  >
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-1">
                        {filteredProviders.find(p => p.id === selectedProvider)!.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {filteredProviders.find(p => p.id === selectedProvider)!.service}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold">
                          {filteredProviders.find(p => p.id === selectedProvider)!.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({filteredProviders.find(p => p.id === selectedProvider)!.reviews} {t.reviews})
                        </span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {t.from} {filteredProviders.find(p => p.id === selectedProvider)!.price}₽
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </section>
  );
};
