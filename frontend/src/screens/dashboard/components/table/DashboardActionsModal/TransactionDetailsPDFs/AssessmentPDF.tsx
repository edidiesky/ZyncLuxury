import { Text, View } from '@react-pdf/renderer';

import { Styles } from './index';
import { type TransactionDetailsProps } from '@/types'

interface AssessmentPDFProps
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

const AssessmentPDF: React.FC<AssessmentPDFProps> = ({
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
        <Text style={styles.detailLabel}>Assessment ID</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?._id || 'AKS-2025-00...'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Taxpayer</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.taxpayer || 'Uyo Retail Solutions L...'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Type</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.type || 'Corporate Income Tax...'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Issue Date</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.issueDate || '12 Apr 2025'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Due Date</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.dueDate || '26 Apr 2025'}
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
            {selectedTransaction?.amount?.replace('NGN', '') || '2,450,000'}
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
                {selectedTransaction?.taxpayer || 'Uyo Retail Solutions Ltd'}
              </Text>
              <Text style={styles.entityTin}>
                {selectedTransaction?.tin || 'D-9876543210'}
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

export default AssessmentPDF;
