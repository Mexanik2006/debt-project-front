import { CameraOutlined } from '@ant-design/icons'
import { Button, Space, Upload } from 'antd'
import React from 'react'

function UploadImage() {
    return (
        <div>
            <Space
                direction="vertical"
            >
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                    maxCount={1}
                >
                    <div className="uploadImagegegbtn">
                        <h1>+</h1>
                        <span>Rasm joylash</span>
                    </div>
                </Upload>
            </Space>
        </div>
    )
}

export default UploadImage