import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { type TransactionDetailsProps } from '@/types';
import AssessmentPDF from './AssessmentPDF';
import TaxpayerPDF from './TaxpayerPDF';
import RemittancePDF from './RemittancePDF';
import PaymentPDF from './PaymentPDF';

Font.register({
  family: 'DMSans',
  src: '/fonts/DMSans-VariableFont_opsz,wght.ttf',
});

// Shared styles for all transaction types
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    fontFamily: 'DMSans',
    backgroundColor: '#F9FAFB',
    width: 495,
  },
  header: {
    backgroundColor: '#F68634',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    gap: 60,
    padding: 12,
    marginBottom: 16,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    lineHeight: 1.2,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 4,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderBottomWidth: 1,
    borderBottomColor: '#F6F8FA',
    paddingVertical: 20,
    paddingHorizontal: 24,
    textTransform: 'uppercase',
  },
  subHeaderTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: '#0A0D14',
  },
  section: {},
  sectionTitle: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 24,
    fontSize: 14,
    fontWeight: 500,
    color: '#868C98',
    textTransform: 'uppercase',
  },
  sectionContent: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  amount: {
    fontSize: 32,
    fontWeight: 500,
    color: '#0A0D14',
  },
  status: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 8,
  },
  entityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#E5E7EB',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    color: '#868C98',
  },
  entityInfo: {
    flexDirection: 'column',
    gap: 6,
  },
  entityName: {
    fontSize: 18,
    fontWeight: 500,
    color: '#0A0D14',
  },
  entityTin: {
    fontSize: 14,
    color: '#525866',
    fontWeight: 400,
  },
  detailItem: {
    flexDirection: 'column',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 15,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: '#868C98',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: 500,
    color: '#0A0D14',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    fontSize: 10,
    color: '#868C98',
    textAlign: 'center',
  },
} as const);

// Export the type of styles for use in other modules
export type Styles = typeof styles;

const TransactionDetailsPDF: React.FC<TransactionDetailsProps> = ({
  type,
  selectedTransaction,
  modalTitle,
  primarySectionTitle,
  entitySectionTitle,
  detailsSectionTitle,
}) => {
  const renderStatus = (status?: string) => {
    return status || 'Unknown';
  };

  const renderModule = () => {
    switch (type) {
      case 'assessment':
        return (
          <AssessmentPDF
            selectedTransaction={selectedTransaction}
            primarySectionTitle={primarySectionTitle}
            entitySectionTitle={entitySectionTitle}
            detailsSectionTitle={detailsSectionTitle}
            renderStatus={renderStatus}
            styles={styles}
          />
        );
      case 'taxpayer':
        return (
          <TaxpayerPDF
            selectedTransaction={selectedTransaction}
            primarySectionTitle={primarySectionTitle}
            entitySectionTitle={entitySectionTitle}
            detailsSectionTitle={detailsSectionTitle}
            renderStatus={renderStatus}
            styles={styles}
          />
        );
      case 'remittance':
        return (
          <RemittancePDF
            selectedTransaction={selectedTransaction}
            primarySectionTitle={primarySectionTitle}
            entitySectionTitle={entitySectionTitle}
            detailsSectionTitle={detailsSectionTitle}
            renderStatus={renderStatus}
            styles={styles}
          />
        );
      case 'payment':
      default:
        return (
          <PaymentPDF
            selectedTransaction={selectedTransaction}
            primarySectionTitle={primarySectionTitle}
            entitySectionTitle={entitySectionTitle}
            detailsSectionTitle={detailsSectionTitle}
            renderStatus={renderStatus}
            styles={styles}
          />
        );
    }
  };

  return (
    <Document>
      <Page size={{ width: 850, height: 1050 }} style={styles.page} wrap>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={{ width: 100, height: 100, marginRight: 12 }}>
            <Image
              src="/assets/images/akirs_logo.png"
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              Akwa Ibom State Internal Revenue Service
            </Text>
            <Text style={styles.headerSubtitle}>Tax Receipt Summary</Text>
          </View>
        </View>

        {/* Sub-Header */}
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>{modalTitle}</Text>
        </View>

        {/* Render the specific transaction module */}
        {renderModule()}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>Generated on May 05, 2025</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TransactionDetailsPDF;
