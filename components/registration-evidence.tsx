import Image from 'next/image';
import { educationInfo } from '../lib/education-info';

export function RegistrationEvidence() {
  return <article className="registration-evidence" aria-labelledby="registration-title">
    <a className="registration-thumbnail" href={educationInfo.registrationImage} target="_blank" rel="noopener noreferrer" aria-label="교육기관 등록증 크게 보기 (새 창)">
      <Image src={educationInfo.registrationImage} alt="한국안전교육 건설업 기초안전·보건교육기관 등록증 제156호" width={1464} height={1876} sizes="160px" />
      <span>등록증 크게 보기 ↗</span>
    </a>
    <div className="registration-details">
      <p className="eyebrow">INSTITUTION REGISTRATION</p>
      <h3 id="registration-title">건설업 기초안전·보건교육기관</h3>
      <dl><div><dt>교육기관 등록번호</dt><dd>{educationInfo.registrationNumber}</dd></div><div><dt>등록증 발급일</dt><dd>{educationInfo.registrationDate}</dd></div><div><dt>발급기관</dt><dd>{educationInfo.registrationIssuer}</dd></div></dl>
      <p>제공된 교육기관 등록증 기준입니다. 사업자등록번호와 별도로 확인할 수 있습니다.</p>
      <a className="text-link" href={educationInfo.registryUrl} target="_blank" rel="noopener noreferrer">공단 교육기관 조회 <span aria-hidden="true">↗</span></a>
    </div>
  </article>;
}
