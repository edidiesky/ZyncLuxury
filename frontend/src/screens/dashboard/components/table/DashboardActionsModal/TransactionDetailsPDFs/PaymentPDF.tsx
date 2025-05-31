import { Text, View } from '@react-pdf/renderer';

import { Styles } from './index';
import { type TransactionDetailsProps } from '@/types'

interface PaymentPDFProps
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

const PaymentPDF: React.FC<PaymentPDFProps> = ({
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
        <Text style={styles.detailLabel}>Payment ID</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?._id || 'PAY-12345'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Taxpayer</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.taxpayer || 'Akwa Prime Ltd'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Tax Type</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.taxType || 'Corporate Income Tax'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Payment Date</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.paymentDate || '2025-04-26 14:32:47'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Method</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.method || 'Money Transfer'}
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
          <Text style={styles.amount} wrap>
            {'NGN'}{' '}
            {selectedTransaction?.amount?.replace('NGN', '') || '1,200,000'}
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

export default PaymentPDF;
