import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import ReactAudioPlayer from 'react-audio-player';
import Images from 'Images';

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 65,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

export default function MusicPlayerSlider({ audioFile }) {
  const theme = useTheme();
  const [audioPlayer, setAudioPlayer] = React.useState(null); // State to hold audio player reference
  const [paused, setPaused] = React.useState(true); // State to manage play/pause state

  // Function to initialize the audio player
  const handleAudioLoad = (player) => {
    setAudioPlayer(player);
  };

  // Function to handle play/pause functionality
  const handlePlayPause = () => {
    if (audioPlayer) {
      if (paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      setPaused(!paused);
    }
  };

  // Function to handle fast forward (10 seconds forward)
  const handleFastForward = () => {
    if (audioPlayer) {
      audioPlayer.currentTime += 10;
    }
  };

  // Function to handle fast rewind (10 seconds backward)
  const handleFastRewind = () => {
    if (audioPlayer) {
      audioPlayer.currentTime -= 10;
    }
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt="Album Cover"
              src={Images.LogoSevoc} // Replace with actual cover image source
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              Audio
            </Typography>
            <Typography noWrap>
              <b>Audio Title</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              Artist Name
            </Typography>
          </Box>
        </Box>
        {audioFile ? (
          <ReactAudioPlayer
            src={URL.createObjectURL(audioFile)}
            controls
            style={{ marginTop: '16px' }}
            onLoad={(e) => handleAudioLoad(e.target)}
            onPause={() => setPaused(true)}
            onPlay={() => setPaused(false)}
          />
        ) : (
          <Typography variant="body1">No audio file selected</Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song" onClick={handleFastRewind}>
            <FastRewindRounded fontSize="large" htmlColor={theme.palette.mode === 'dark' ? '#fff' : '#000'} />
          </IconButton>
          <IconButton aria-label={paused ? 'play' : 'pause'} onClick={handlePlayPause}>
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={theme.palette.mode === 'dark' ? '#fff' : '#000'} />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={theme.palette.mode === 'dark' ? '#fff' : '#000'} />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={handleFastForward}>
            <FastForwardRounded fontSize="large" htmlColor={theme.palette.mode === 'dark' ? '#fff' : '#000'} />
          </IconButton>
        </Box>

      </Widget>

    </Box>
  );
}
