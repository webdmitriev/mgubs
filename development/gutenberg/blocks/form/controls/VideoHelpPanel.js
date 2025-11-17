import { useState } from '@wordpress/element';
import { PanelBody, Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const VideoHelpPanel = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoPath = `${themeData.uploadUrl}/form.mov`;

  return (
    <>
      <PanelBody title={__('Instructions', 'theme')} initialOpen={true}>
        <p>
          {__('Video instructions.', 'theme')}
        </p>
        <Button
          variant="primary"
          onClick={() => setIsVideoOpen(true)}
          icon="video-alt3"
        >
          {__('Play', 'theme')}
        </Button>
      </PanelBody>

      {isVideoOpen && (
        <Modal
          title={__('Video instruction', 'theme')}
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
