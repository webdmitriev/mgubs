import { useState } from '@wordpress/element';
import { PanelBody, Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const VideoHelpPanel = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoPath = `${themeData.uploadUrl}/default.mov`;

  return (
    <>
      <PanelBody title={__('Видео блока', 'theme')} initialOpen={false}>
        <p>
          {__('Видео инструкция.', 'theme')}
        </p>
        <Button
          variant="primary"
          onClick={() => setIsVideoOpen(true)}
          icon="video-alt3"
        >
          {__('Воспроизвести', 'theme')}
        </Button>
      </PanelBody>

      {isVideoOpen && (
        <Modal
          title={__('Block 01 - Главный блок', 'theme')}
          onRequestClose={() => setIsVideoOpen(false)}
          className="help-video-modal"
        >
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <video
              src={videoPath}
              controls
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '8px',
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default VideoHelpPanel;
