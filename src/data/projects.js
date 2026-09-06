const projects = [
  {
    title: 'Sound-Track',
    year: 'Aug 2026',
    emoji: '🎧',
    summary: 'Wrapped-style listening summaries and custom playlists, built end to end.',
    detail:
      'Implemented OAuth and an API pipeline that turns listening history and taste into stats and playlist picks.',
    tech: ['TypeScript', 'Node.js', 'REST API'],
    repoUrl: 'https://github.com/SauceageTF/soundtrack',
    liveUrl: 'https://soundtrack-anytime.vercel.app',
  },
  {
    title: 'Pico VGA Signal Generator',
    year: 'Aug 2026',
    emoji: '📺',
    summary: 'A native 480p, 60 Hz colour VGA signal driven straight from Pico GPIO pins.',
    detail:
      'No breakout board and no driver hardware — sync and colour generation hand-implemented at the level of raw GPIO timing and display protocols.',
    tech: ['Raspberry Pi Pico', 'MicroPython'],
    repoUrl: '',
    liveUrl: '',
  },
  {
    title: '458 Thrustmaster Bridge',
    year: '2026',
    emoji: '🏎️',
    summary:
      "A racing wheel that Windows' XInput stack refuses to enumerate, made usable in PC games.",
    detail:
      'Rebound the wheel to WinUSB, reverse-engineered its undocumented USB reports to map steering, pedals and buttons, and re-published them as a virtual Xbox 360 controller through ViGEmBus. Shipped as a WPF app with hot-plug recovery and an installer.',
    tech: ['C#/.NET', 'WPF', 'libusb'],
    repoUrl: 'https://github.com/SauceageTF/458-Thrustmaster-Bridge',
    liveUrl: '',
  },
  {
    title: 'ModernMouse',
    year: '2025 — present',
    emoji: '🖱️',
    summary: 'A custom wireless mouse, designed from schematic to fabrication-ready PCB.',
    detail:
      'Built around a Nordic nRF54 SoC and a PixArt PAW3395 optical sensor, with a complete bill of materials for fabrication.',
    tech: ['KiCad'],
    repoUrl: 'https://github.com/SauceageTF/ModernMouse',
    liveUrl: '',
  },
  {
    title: 'RayTracing Quadris',
    year: '2023',
    emoji: '🎮',
    summary: 'A Tetris-style puzzle game with custom ray-traced rendering.',
    detail: 'Real-time lighting and reflections, built in Unreal Engine 5.1.',
    tech: ['C++', 'Unreal Engine 5'],
    repoUrl: 'https://github.com/SauceageTF/RT-Quadris',
    liveUrl: '',
  },
  {
    title: 'Pong',
    year: '2023',
    emoji: '🏓',
    summary: 'The classic, rebuilt from scratch.',
    detail: '',
    tech: ['Python'],
    repoUrl: 'https://github.com/SauceageTF/Pong',
    liveUrl: '',
  },
  {
    title: 'Practice Board',
    year: '2026',
    emoji: '⌨️',
    summary: 'A fun keyboard project, just to mess around and play with switches',
    detail: '',
    tech: [],
    repoUrl: 'https://github.com/SauceageTF/Practice-Board',
    liveUrl: '',
  },
]

export default projects
