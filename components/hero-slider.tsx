'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import { heroPhotos } from '../lib/education-photos';
import 'swiper/css';
import 'swiper/css/a11y';

export function HeroSlider() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [hovered, setHovered] = useState(false);
  const autoplayAllowed = !paused && !reducedMotion && !hovered;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    if (autoplayAllowed) swiper.autoplay.start();
    else swiper.autoplay.stop();
    return () => { if (!swiper.destroyed) swiper.autoplay.stop(); };
  }, [swiper, autoplayAllowed]);

  function navigate(index: number) {
    setPaused(true);
    swiper?.slideToLoop(index);
  }

  return <section
    className="hero-photo hero-slider"
    aria-label="한국안전교육 실제 교육 사진 5장"
    aria-roledescription="이미지 슬라이더"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onFocusCapture={event => {
      if (event.target instanceof HTMLElement && event.target.closest('.slider-play')) return;
      setPaused(true);
    }}
    onKeyDown={event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      setPaused(true);
      if (event.key === 'ArrowLeft') swiper?.slidePrev();
      else swiper?.slideNext();
    }}
  >
    <div className="hero-media"><Swiper
      id="hero-slides"
      className="hero-swiper"
      modules={[A11y, Autoplay]}
      slidesPerView={1}
      loop
      speed={reducedMotion ? 0 : 600}
      autoplay={{ enabled: false, delay: 6500, disableOnInteraction: true }}
      a11y={{ slideLabelMessage: '전체 {{slidesLength}}장 중 {{index}}번째 실제 교육 사진', wrapperLiveRegion: false }}
      onSwiper={setSwiper}
      onSlideChange={instance => setActive(instance.realIndex)}
      onTouchStart={() => setPaused(true)}
    >
      {heroPhotos.map((photo, index) => <SwiperSlide key={photo.file} aria-hidden={active !== index}>
        <Image src={`/images/center/${photo.file}`} alt={photo.alt} width={photo.width} height={photo.height}
          sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1280px) 48vw, 600px"
          preload={index === 0} style={{ objectPosition: photo.position }} />
      </SwiperSlide>)}
    </Swiper>
    <span className="slider-counter" aria-label={`전체 5장 중 ${active + 1}번째 사진`}>{String(active + 1).padStart(2, '0')}<span> / 05</span></span>
    </div>
    <div className="slider-caption" aria-live={autoplayAllowed ? 'off' : 'polite'} aria-atomic="true">
      <span className="photo-label">한국안전교육 실제 교육 현장</span>
      <h2>{heroPhotos[active].title}</h2>
      <p>{heroPhotos[active].text}</p>
    </div>
    <div className="slider-controls">
      <div className="slider-pagination" role="group" aria-label="실제 교육 사진 선택">
        {heroPhotos.map((photo, index) => <button type="button" key={photo.file}
          aria-label={`${index + 1}번째 사진: ${photo.title}`} aria-current={active === index ? 'true' : undefined}
          aria-controls="hero-slides" onClick={() => navigate(index)}><span /></button>)}
      </div>
      <div className="slider-navigation">
        <button type="button" aria-label="이전 사진" aria-controls="hero-slides" onClick={() => { setPaused(true); swiper?.slidePrev(); }}>←</button>
        <button type="button" className="slider-play" disabled={reducedMotion}
          aria-label={reducedMotion ? '동작 줄이기 설정으로 자동 재생 꺼짐' : paused ? '자동 재생 시작' : '자동 재생 일시정지'}
          aria-pressed={!paused && !reducedMotion} onClick={() => setPaused(value => !value)}>
          <span className={paused || reducedMotion ? 'play-symbol' : 'pause-symbol'} aria-hidden="true" />
        </button>
        <button type="button" aria-label="다음 사진" aria-controls="hero-slides" onClick={() => { setPaused(true); swiper?.slideNext(); }}>→</button>
      </div>
    </div>
  </section>;
}
