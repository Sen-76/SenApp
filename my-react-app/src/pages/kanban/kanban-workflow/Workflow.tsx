import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { HddOutlined, SubnodeOutlined } from '@ant-design/icons';
import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  MarkerType,
  Panel
} from 'reactflow';
import CustomNode from './components/CustomNode';
import 'reactflow/dist/style.css';
import { Button, Form, Modal, Row, Col, Select, Input } from 'antd';

const { confirm } = Modal;
const nodeTypes = {
  selectorNode: CustomNode
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'selectorNode',
    data: { label: 'Open' },
    position: { x: 250, y: 0 }
  },
  {
    id: '2',
    type: 'selectorNode',
    data: { label: 'Inprocess' },
    position: { x: 250, y: 100 }
  },
  {
    id: '3',
    type: 'selectorNode',
    data: { label: 'Closed' },
    position: { x: 250, y: 200 }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'Do task',
    type: 'smoothstep',
    sourceHandle: 'bottom1',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: 'e1-3',
    source: '2',
    target: '3',
    label: 'Done task',
    type: 'smoothstep',
    sourceHandle: 'bottom1',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  }
];

function Workflow() {
  const { setBreadcrumb } = useBreadcrumb();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [form] = Form.useForm();
  const getNodeId = () => `randomnode_${+new Date()}`;

  const getInitData = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  const onConnect = (params: Edge | Connection) => {
    form.setFieldsValue({
      from: [params.source],
      to: params.target,
      name: ''
    });
    const options: A[] = [];
    nodes.forEach((e) => {
      options.push({
        label: e.data.label,
        value: e.id
      });
    });

    confirm({
      title: 'Add transition',
      icon: <SubnodeOutlined />,
      width: 750,
      content: (
        <>
          <Form layout="vertical" style={{ marginTop: '20px' }} form={form}>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item name="from" label="From status">
                  <Select mode="multiple" options={options} size="large" placeholder="Select node(s)"></Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item name="to" label="To status">
                  <Select options={options} size="large" placeholder="Select node(s)"></Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item name="name" label="Name">
                  <Input size="large" placeholder="Input name"></Input>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ),
      onOk() {
        setEdges((els) =>
          addEdge(
            {
              ...params,
              markerEnd: { type: MarkerType.ArrowClosed },
              type: 'smoothstep',
              label: form.getFieldValue('name')
            },
            els
          )
        );
      },
      onCancel() {
        console.log('cancel');
      }
    });
  };

  const onNodeClick = (event: A, node: Node) => {
    form.setFieldsValue({ name: node.data.label });
    confirm({
      title: 'Update node',
      icon: <SubnodeOutlined />,
      width: 750,
      content: (
        <>
          <Form layout="vertical" style={{ marginTop: '20px' }} form={form}>
            <Row>
              <Col span={24}>
                <Form.Item name="name" label="Name">
                  <Input size="large" placeholder="Input name"></Input>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ),
      onOk() {
        const updatedName = form.getFieldValue('name');
        const nodeIndex = nodes.findIndex((element) => element.id === node.id);
        if (nodeIndex !== -1) {
          const updatedElements = [...nodes];
          updatedElements[nodeIndex].data.label = updatedName;
        }
      },
      onCancel() {
        console.log('cancel');
      }
    });
  };

  const onAdd = useCallback(() => {
    const lastNode = initialNodes[initialNodes.length - 1];
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      type: 'selectorNode',
      position: {
        x: lastNode.position.x,
        y: lastNode.position.y + 100
      }
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  useEffect(() => {
    getInitData();
    setBreadcrumb([
      { icon: <HddOutlined />, text: 'Kanban' },
      { path: '/kanban', text: 'Kanban Board' },
      { text: 'Kanban Workflow' }
    ]);
  }, []);

  return (
    <>
      <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
          <Panel position="top-right">
            <Button onClick={onAdd}>Add node</Button>
          </Panel>
        </ReactFlow>
      </div>
    </>
  );
}

export default Workflow;
