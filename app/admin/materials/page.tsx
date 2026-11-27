import Link from 'next/link';
import { MaterialsUploader } from '../../../components/materials-uploader';
import { pageMetadata } from '../../../lib/seo';

export const metadata = {
  ...pageMetadata({ title: '자료 관리 | 한국안전교육', description: '한국안전교육 관리자 자료 등록 페이지', path: '/admin/materials', searchable: false }),
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function MaterialsAdminPage() {
  return <main className="container policy-page admin-materials-page">
    <Link href="/" className="text-link">홈페이지로 돌아가기</Link>
    <Link href="/materials" className="text-link admin-board-link">공개 자료실 보기</Link>
    <h1>교육자료 관리</h1>
    <p className="policy-intro">공개할 교육자료를 등록하는 관리자 페이지입니다. 등록 암호는 서버에서 확인합니다.</p>
    <MaterialsUploader />
  </main>;
}
