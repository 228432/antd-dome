import React, { useCallback, useRef, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme,Form, Input } from 'antd';
import styles from './App.module.css'
const {Item} =Form
const { Header, Sider,Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [text,settext]=useState('')


  const onFinish=(values)=>{
   const {text}=values
   setItems(changeItem(items,text))
   settext(text)
  }

  const changeItem=useCallback((items,data)=>{
        console.log(text);
     return items.map((item)=>{
            
            if(item.children){
             item.children=  changeItem(item.children,data)
            }
            if(item.label===text ){
              item.label=data
            }

            return item
        })
  },[text])

  const fromRef=useRef()

  const menuClick=(data)=>{
    console.log('111');
     let value= data.domEvent.target.innerText
     fromRef.current.setFieldValue('text',value)
     settext(value)
  }

  const [items,setItems]=useState([
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'nav 1',
      children:[
      { key: '4',
      icon: <UserOutlined />,
      label: '文本1',
      },
      {
        key: '5',
        icon: <UserOutlined />,
        label: '文本2',
      }]
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'nav 2',
      children:[
        {key: '6',
        icon: <UserOutlined />,
        label: '文本3',
        },
        {key: '7',
        icon: <UserOutlined />,
        label: '文本4',
        }
      ]
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
    },
  ])



  return (
    <Layout className={styles.layouts}>
      <Sider width={250}   trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu 
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={menuClick}
          items={items}
        />
      </Sider>
      <Layout >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Form
           ref={fromRef}
           labelCol={{ span: 8 }}
           wrapperCol={{ span: 16 }}
           style={{ maxWidth: 600 }}
           initialValues={{ remember: true }}
           onFinish={onFinish}
           autoComplete="off"
          >
            <Item  name='text'>
              <Input/> 
            </Item>
            <Button type='primary' htmlType="submit">保存</Button>
          </Form>
          </Content>
      </Layout>
    </Layout>
  );
};

export default App;