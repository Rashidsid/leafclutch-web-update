export const metadata = { title: 'Careers' }

export default function CareersPage() {
  return <Placeholder title="Careers" />
}

function Placeholder({ title }: { title: string }) {
  return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><h1 className="text-3xl font-bold text-foreground">{title}</h1></div>
}