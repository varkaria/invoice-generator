"use client";

import { Button } from "@/components/ui/button";
import { Document, Font, Page } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

export const DownloadInvoiceButton = () => {
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
  } = useData();

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div>
        <h1 className="text-5xl font-semibold pb-6">Your invoice is ready</h1>
        <p className="text-neutral-500 text-xl pb-7">
          Please review the details carefully before downloading your invoice.
        </p>
        <Button
          onClick={async () => {
            const blob = await pdf(
              <Document>
                <Page size="A4" style={pdfContainers.page}>
                  <PdfDetails
                    companyDetails={companyDetails}
                    invoiceDetails={invoiceDetails}
                    invoiceTerms={invoiceTerms}
                    paymentDetails={paymentDetails}
                    yourDetails={yourDetails}
                  />
                </Page>
              </Document>
            ).toBlob();
            saveAs(blob, "invoice.pdf");
          }}
          type="button"
          className="w-full h-12 rounded-lg text-lg plausible-event-name=invoice-generated"
        >
          <Download className="mr-2 h-6 w-6" /> Download Invoice
        </Button>
      </div>
    </div>
  );
};

Font.register({
  family: "Geist",
  fonts: [
    {
      src: "/font/IBMPlexSansThaiLooped-Thin.ttf",
      fontWeight: "thin",
    },
    {
      src: "/font/IBMPlexSansThaiLooped-Light.ttf",
      fontWeight: "light",
    },
    {
      src: "/font/IBMPlexSansThaiLooped-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/font/IBMPlexSansThaiLooped-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "/font/IBMPlexSansThaiLooped-SemiBold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "/font/IBMPlexSansThaiLooped-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});
