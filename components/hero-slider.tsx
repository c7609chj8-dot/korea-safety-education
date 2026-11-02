'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/a11y';

const slides = [
  { file: '01-safety-education-hero.png', title: '안전의 기본을 배우는 시간', detail: '현장에 나서기 전, 안전부터 준비합니다.', alt: '안전모, 보안경, 작업장갑과 교육 노트를 배치한 안전교육 일러스트' },
  { file: '02-personal-protective-equipment.png', title: '보호구 착용부터 꼼꼼하게', detail: '함께 확인하는 작은 습관이 안전의 시작입니다.', alt: '두 근로자가 현장 입구에서 안전모 턱끈과 개인보호구를 점검하는 생성 이미지' },
  { file: '03-fall-prevention.png', title: '높은 곳에서는 더욱 신중하게', detail: '추락 위험을 이해하고 예방의 기본을 배웁니다.', alt: '안전난간 안에서 안전대를 착용한 건설근로자의 추락 예방 생성 이미지' },
  { file: '04-safety-classroom.png', title: '이해하기 쉬운 안전교육', detail: '현장에서 필요한 안전수칙을 함께 살펴봅니다.', alt: '강사가 교육생들에게 보호구와 안전시설을 설명하는 가상의 안전교육 교실' },
  { file: '05-site-inspection.png', title: '작업 전, 한 번 더 확인', detail: '작업 환경과 이동 통로를 함께 점검합니다.', alt: '두 근로자가 정리된 건설현장과 분리된 보행 통로를 점검하는 생성 이미지' },
];

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
    className="hero-slider"
    aria-label="안전교육 이미지"
    aria-roledescription="이미지 슬라이더"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onFocusCapture={event => {
      // The play control owns its toggle; pausing on its focus would invert a pause click.
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
    <div className="slider-topline"><span>SAFETY EDUCATION</span><span>안전한 현장을 위한 첫걸음</span></div>
    <Swiper
      id="hero-slides"
      className="hero-swiper"
      modules={[A11y, Autoplay]}
      slidesPerView={1}
      loop
      speed={reducedMotion ? 0 : 500}
      autoplay={{ enabled: false, delay: 5500, disableOnInteraction: true }}
      a11y={{ slideLabelMessage: '전체 {{slidesLength}}장 중 {{index}}번째 이미지', wrapperLiveRegion: false }}
      onSwiper={setSwiper}
      onSlideChange={instance => setActive(instance.realIndex)}
      onTouchStart={() => setPaused(true)}
    >
      {slides.map((slide, index) => <SwiperSlide key={slide.file} aria-hidden={active !== index}>
        <div className="slider-image-wrap"><Image
          src={`/images/safety/${slide.file}`}
          alt={slide.alt}
          width={1536}
          height={1024}
          sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1280px) 44vw, 510px"
          priority={index === 0}
          className="slider-image"
        /></div>
      </SwiperSlide>)}
    </Swiper>
    <div className="slider-caption" aria-live={autoplayAllowed ? 'off' : 'polite'} aria-atomic="true"><h2>{slides[active].title}</h2><p>{slides[active].detail}</p></div>
    <div className="slider-controls">
      <div className="slider-pagination" role="group" aria-label="이미지 선택">{slides.map((slide, index) => <button
        type="button" key={slide.file}
        aria-label={`${index + 1}번째 이미지: ${slide.title}`}
        aria-current={active === index ? 'true' : undefined}
        aria-controls="hero-slides"
        onClick={() => navigate(index)}
      ><span /></button>)}</div>
      <div className="slider-navigation">
        <span className="slider-counter" aria-label={`전체 ${slides.length}장 중 ${active + 1}번째`}>{String(active + 1).padStart(2, '0')}<span> / {String(slides.length).padStart(2, '0')}</span></span>
        <button type="button" aria-label="이전 이미지" aria-controls="hero-slides" onClick={() => { setPaused(true); swiper?.slidePrev(); }}>←</button>
        <button type="button" className="slider-play" disabled={reducedMotion} aria-label={reducedMotion ? '동작 줄이기 설정으로 자동 재생 꺼짐' : paused ? '자동 재생 시작' : '자동 재생 일시정지'} aria-pressed={!paused && !reducedMotion} onClick={() => setPaused(value => !value)}><span className={paused || reducedMotion ? 'play-symbol' : 'pause-symbol'} aria-hidden="true" /></button>
        <button type="button" aria-label="다음 이미지" aria-controls="hero-slides" onClick={() => { setPaused(true); swiper?.slideNext(); }}>→</button>
      </div>
    </div>
    <p className="slider-disclaimer">AI로 제작한 교육용 이미지이며 실제 교육장 사진이 아닙니다.</p>
  </section>;
}
