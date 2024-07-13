import MainLayout from "@/layouts/mainLayout";
import StocksOverview from "@/components/stocks-overview";

export default function Dashboard() {
  return (
    <MainLayout>
      <StocksOverview />
    </MainLayout>
  );
}

Dashboard.auth = true;
