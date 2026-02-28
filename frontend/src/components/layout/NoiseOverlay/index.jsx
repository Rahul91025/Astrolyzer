import React from 'react';

// Use a CSS pseudo-element approach (no SVG filter runtime cost)
// The noise is pre-rendered via a data URI PNG used as a static background
const NoiseOverlay = () => {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[200] select-none"
            style={{
                opacity: 0.035,
                backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4t5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dML3b1/iSns68+ipGSneCEB4jb2eI86dmeBggHiMJKs27P3WYih2iFCYpFI7lS4ht5oFJfzWkSmbiLWEL+N5yc5IqHM68LnCKUCV0wPt2dtn9aXIIHHnKKX21I2MhhIAAAAAElFkJggg==")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '200px 200px',
                mixBlendMode: 'overlay',
            }}
        />
    );
};

export default NoiseOverlay;
