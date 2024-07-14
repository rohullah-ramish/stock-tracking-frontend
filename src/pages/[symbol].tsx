import StockDetails from "@/components/stock-details";
import MainLayout from "@/layouts/mainLayout";

export default function StockDetailsPage() {
  return (
    <MainLayout>
      <StockDetails />
    </MainLayout>
  );
}

StockDetailsPage.auth = true;
