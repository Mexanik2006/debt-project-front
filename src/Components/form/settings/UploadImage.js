import { CameraOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
function UploadImage() {
    return (
        <div>
            <Space
                direction="vertical"
                style={{ maxWidth: '200px' }}
            >
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                    maxCount={1}
                    style={{ maxWidth: "400px" }}
                >
                    <Button icon={<CameraOutlined />} style={{ maxWidth: "400px" }} >
                        Rasm Yuklash
                    </Button>
                </Upload>
            </Space>
        </div>
    );
}

export default UploadImage;
