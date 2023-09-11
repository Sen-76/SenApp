import { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import styles from '../Workflow.module.scss';

const CustomNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className={styles.customNode}>
      <Handle id="top1" type="target" position={Position.Top} style={{ left: '33%' }} isConnectable={isConnectable} />
      <Handle id="top2" type="target" position={Position.Top} style={{ left: '66%' }} isConnectable={isConnectable} />
      {data?.label}
      <Handle
        id="bottom1"
        type="source"
        position={Position.Bottom}
        style={{ left: '33%' }}
        isConnectable={isConnectable}
      />
      <Handle
        id="bottom2"
        type="source"
        position={Position.Bottom}
        style={{ left: '66%' }}
        isConnectable={isConnectable}
      />
      <Handle id="left" type="source" position={Position.Left} isConnectable={isConnectable} />
      <Handle id="right" type="source" position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
};

CustomNode.displayName = 'CustomNode';

export default memo(CustomNode);
