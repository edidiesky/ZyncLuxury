import { Text, View } from '@react-pdf/renderer';

import { Styles } from './index';
import { type TransactionDetailsProps } from '@/types';

interface RemittancePDFProps
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

const RemittancePDF: React.FC<RemittancePDFProps> = ({
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
        <Text style={styles.detailLabel}>Remittance ID</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?._id || 'RMT-10023'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Agent</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.agent || 'Uyo Central Bank'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Tax Type</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.taxType || 'Corporate Income Tax...'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Due Date</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.dueDate || '2025-04-30'}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Remittance Date</Text>
        <Text style={styles.detailValue}>
          {selectedTransaction?.remittanceDate || '2025-04-26'}
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

      {/* Entity Section (Agent Info) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{entitySectionTitle}</Text>
        <View style={styles.sectionContent}>
          <View style={styles.entityRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {selectedTransaction?.agent?.charAt(0) || 'A'}
              </Text>
            </View>
            <View style={styles.entityInfo}>
              <Text style={styles.entityName}>
                {selectedTransaction?.agent || 'Uyo Central Bank'}
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

export default RemittancePDF;
