import { Text, View } from '@react-pdf/renderer';

import { Styles } from './index';
import { type TransactionDetailsProps } from '@/types';

interface TaxpayerPDFProps
  extends Pick<
    TransactionDetailsProps,
    | 'selectedTransaction'
    | 'primarySectionTitle'
    | 'entitySectionTitle'
    | 'detailsSectionTitle'
  > {
  renderStatus: (status?: string) => string;
  styles: Styles;
}

const TaxpayerPDF: React.FC<TaxpayerPDFProps> = ({
  selectedTransaction,
  primarySectionTitle,
  entitySectionTitle,
  detailsSectionTitle,
  renderStatus,
  styles,
}) => {
  const renderDetails = () => (
    <>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Taxpayer</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.taxpayer || 'Akwa Prime Ltd'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>TIN</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.tin || 'AKW2345678'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Category</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.category || 'Corporate'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Registration Date</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.registrationDate || '12 Apr 2025'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Tax Compliance</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.taxCompliance || '90%'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Outstanding Tax</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.outstandingTax || 'NGN542,800'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Last Payment</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.lastPayment || 'Apr 26, 2025'}
        </Text>
      </View>
    </>
  );

  return (
    <>
      {/* Primary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{primarySectionTitle}</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.status}>
            Status: {renderStatus(selectedTransaction?.status)}
          </Text>
        </View>
      </View>

      {/* Entity Section (Taxpayer Info) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{entitySectionTitle}</Text>
        <View style={styles.sectionContent}>
          <View style={styles.entityRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {selectedTransaction?.taxpayer?.charAt(0) || 'A'}
              </Text>
            </View>
            <View style={styles.entityInfo}>
              <Text style={styles.entityName}>
                {selectedTransaction?.taxpayer || 'Akwa Prime Ltd'}
              </Text>
              <Text style={styles.entityTin}>
                {selectedTransaction?.tin || 'D-1234567890'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{detailsSectionTitle}</Text>
        <View style={styles.sectionContent}>{renderDetails()}</View>
      </View>
    </>
  );
};

export default TaxpayerPDF;
