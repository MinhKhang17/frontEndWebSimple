import { useEffect } from 'react'

export default function VideoInitializer() {
  useEffect(() => {
    function buildYoutubeSrc(id) {
      const params = new URLSearchParams({
        autoplay: '1',
        controls: '1',
        fs: '1',
        modestbranding: '1',
        rel: '0',
        iv_load_policy: '3',
        playsinline: '1',
        enablejsapi: '1'
      });
      return `https://www.youtube.com/embed/${id}?${params.toString()}`;
    }

    const attached = [];

    function initVideos() {
      document.querySelectorAll('.video-block').forEach(container => {
        if (container.dataset.initialized) return;
        container.dataset.initialized = '1';

        const playBtn = container.querySelector('.play-btn');
        const iframe = container.querySelector('iframe');
        const posterImg = container.querySelector('.video-poster');
        const fsBtn = container.querySelector('.fs-btn');
        const videoInner = container.querySelector('.video-inner');
        const videoId = container.getAttribute('data-video-id');
        const isYoutube = container.hasAttribute('data-youtube');

        const customPoster = container.getAttribute('data-poster-custom');
        if (customPoster && posterImg) {
          posterImg.src = customPoster;
        } else if (isYoutube && videoId && posterImg?.hasAttribute('data-poster-yt')) {
          posterImg.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }

        if (fsBtn) fsBtn.style.display = 'none';

        const handlePlay = () => {
          if (isYoutube && videoId && iframe) {
            iframe.src = buildYoutubeSrc(videoId);
          }
          container.classList.remove('not-playing');
          container.classList.add('playing');
          if (fsBtn) fsBtn.style.display = 'flex';
          setTimeout(() => container.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
        };

        const posterClick = (e) => { handlePlay(); };
        const playBtnClick = (e) => { handlePlay(); };
        const containerClick = (e) => { if (e.target === fsBtn || e.target.closest('.fs-btn')) return; if (container.classList.contains('not-playing')) handlePlay(); };
        const fsClick = (e) => {
          e.stopPropagation();
          const elToFullscreen = iframe || videoInner || container;
          if (!elToFullscreen) return;
          if (elToFullscreen.requestFullscreen) {
            elToFullscreen.requestFullscreen().catch(() => { if (container.requestFullscreen) container.requestFullscreen().catch(()=>{}); });
          } else if (elToFullscreen.webkitRequestFullscreen) {
            elToFullscreen.webkitRequestFullscreen();
          } else if (elToFullscreen.msRequestFullscreen) {
            elToFullscreen.msRequestFullscreen();
          }
        };
        const keyDown = (ev) => { if ((ev.key === 'Enter' || ev.key === ' ') && playBtn) { ev.preventDefault(); playBtn.click(); } };

        posterImg?.addEventListener('click', posterClick);
        playBtn?.addEventListener('click', playBtnClick);
        container.addEventListener('click', containerClick);
        fsBtn?.addEventListener('click', fsClick);
        if (playBtn) { playBtn.setAttribute('role','button'); playBtn.tabIndex = 0; playBtn.addEventListener('keydown', keyDown); }

        attached.push({ container, posterImg, playBtn, fsBtn, containerClick, posterClick, playBtnClick, fsClick, keyDown });
      });
    }

    // expose for legacy callers
    window.initVideos = initVideos;

    // initialize now
    initVideos();

    return () => {
      attached.forEach(item => {
        const { container, posterImg, playBtn, fsBtn, containerClick, posterClick, playBtnClick, fsClick, keyDown } = item;
        posterImg?.removeEventListener('click', posterClick);
        playBtn?.removeEventListener('click', playBtnClick);
        container?.removeEventListener('click', containerClick);
        fsBtn?.removeEventListener('click', fsClick);
        if (playBtn) playBtn.removeEventListener('keydown', keyDown);
        if (container) delete container.dataset.initialized;
      });
      if (window.initVideos && window.initVideos === initVideos) delete window.initVideos;
    };
  }, []);

  return null;
}
