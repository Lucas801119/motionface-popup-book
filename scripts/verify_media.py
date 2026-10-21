import json
import subprocess
import sys
from pathlib import Path

# 对实际生成的媒体执行完整解码与规格检查；失败时返回非零退出码。
video = Path(sys.argv[1] if len(sys.argv) > 1 else '../outputs/popup-book.mp4')
probe = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(video)
], encoding='utf-8'))
v = next(s for s in probe['streams'] if s['codec_type'] == 'video')
a = next(s for s in probe['streams'] if s['codec_type'] == 'audio')
assert (v['width'], v['height']) == (1920, 1080)
assert v['r_frame_rate'] == '30/1'
assert int(v['nb_frames']) == 1146
assert v['pix_fmt'] == 'yuv420p'
assert abs(float(v['duration']) - 38.2) < .04
assert abs(float(a['duration']) - float(v['duration'])) < .05
subprocess.run(['ffmpeg', '-v', 'error', '-xerror', '-i', str(video), '-f', 'null', '-'], check=True)
print(json.dumps({'result': 'PASS', 'width': v['width'], 'height': v['height'],
    'fps': v['r_frame_rate'], 'frames': v['nb_frames'], 'video_duration': v['duration'],
    'audio_duration': a['duration'], 'pixel_format': v['pix_fmt'], 'full_decode': 'PASS'}, ensure_ascii=False, indent=2))
