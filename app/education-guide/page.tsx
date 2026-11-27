import { LegalPage } from '../../components/legal-page';
import { pageMetadata } from '../../lib/seo';
import { educationInfo } from '../../lib/education-info';
import { RegistrationEvidence } from '../../components/registration-evidence';
import { PageStructuredData } from '../../components/page-structured-data';

export const metadata = pageMetadata({ title: '교육비·준비물·무료교육 대상 | 양산 한국안전교육', description: '교육비 80,000원, 신분증 필수 지참, 선착순 무료교육 대상과 지원 확인 방법을 안내합니다. 교육기관 등록번호 제156호. 양산 한국안전교육 문의 055-389-0302.', path: '/education-guide' });

export default function EducationGuidePage() {
  return <LegalPage title="교육 대상·비용 안내" description="건설업 기초안전보건교육의 대상, 준비물, 무료교육 지원과 기관 등록정보를 확인하세요." updatedAt="2026년 11월 27일">
    <PageStructuredData title="교육 대상·비용 안내" path="/education-guide" description="교육비·신분증·무료교육 지원 확인과 교육기관 등록정보 안내" />
    <section><h2>1. 교육 대상과 사업주의 의무</h2><p>산업안전보건법 제31조는 건설 일용근로자를 채용하는 사업주에게 기초안전보건교육 이수 의무를 부과합니다. 채용 전에 이미 해당 교육을 이수한 경우에는 같은 조의 예외가 적용됩니다.</p><p>모든 건설업 종사자에게 동일하게 새 교육이 필요하다고 단정하지 않습니다. 본인의 기존 이수 여부와 채용·업무 형태에 따른 적용은 사업주와 공식기관에 확인해 주세요.</p></section>
    <section><h2>2. 교육시간과 이수 확인</h2><p>건설업 기초안전보건교육은 총 4시간 과정으로 안내됩니다. 홈페이지의 일정 선택이나 이미지 열람은 실제 교육을 대체하지 않습니다. 출석·이수 및 이수증 확인은 해당 교육과정의 공식 절차에 따릅니다.</p></section>
    <section><h2>3. 교육비·준비물과 무료교육</h2><p>고용노동부는 해당 교육 비용을 사업주가 부담하는 것으로 안내합니다. 홈페이지의 {educationInfo.fee}은 센터 안내금액이며, 근로자가 반드시 개인 비용으로 부담해야 한다는 뜻이 아닙니다. 본인 확인을 위해 신분증을 반드시 지참해 주세요.</p><p>{educationInfo.freeNotice}</p><ul>{educationInfo.freeTargets.map(target => <li key={target}>{target}</li>)}</ul><p className="free-status">{educationInfo.portalNotice}</p><p>무료교육·비용지원은 자격, 예산과 증빙 조건에 따라 달라질 수 있습니다. 접수 전에 대상 여부와 최종 납부 금액을 확인해 주세요.</p></section>
    <section><h2>4. 교육기관 등록 확인</h2><RegistrationEvidence /><p>2026년 11월 27일 공단 교육기관 조회에서 기관명 (주)한국안전교육, 양산시 북정서길 22 주소 및 전화번호 055-389-0302가 일치하는 것을 확인했습니다. 현재 조회 내용과 교육일정은 <a href={educationInfo.registryUrl} target="_blank" rel="noopener noreferrer">공단 건설기초안전 교육포털</a>에서 ‘한국안전교육’을 검색해 확인할 수 있습니다.</p><p>사업자등록번호 217-86-02371은 세무상 사업자 식별번호이며 교육기관 등록번호 {educationInfo.registrationNumber}와 구분합니다.</p></section>
    <section><h2>5. 주차 안내</h2><p>{educationInfo.parking}을 이용하실 수 있습니다.</p></section>
    <section><h2>6. 확인에 사용한 공식 자료</h2><ul className="policy-sources"><li><a href="https://www.law.go.kr/법령/산업안전보건법/제31조" target="_blank" rel="noopener noreferrer">산업안전보건법 제31조</a></li><li><a href="https://www.law.go.kr/법령/산업안전보건법/제33조" target="_blank" rel="noopener noreferrer">산업안전보건법 제33조</a></li><li><a href="https://1350.moel.go.kr/rtmview.do?id=1000270685" target="_blank" rel="noopener noreferrer">고용노동부 교육 대상·시간·비용 안내</a></li></ul></section>
  </LegalPage>;
}
