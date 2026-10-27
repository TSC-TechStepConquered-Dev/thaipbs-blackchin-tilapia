# ใต้ผิวน้ำ — BENEATH THE SURFACE

สารคดีเชิงโต้ตอบภาษาไทย 8 บท สร้างจาก MASTER_PROMPT_BLACKCHIN_2D_CODEX.md และ BLACKCHIN_DOCUMENTARY_CONTENT_AND_DESIGN.md พร้อมสื่อใน media/

## เริ่มใช้งาน

```sh
npm ci
npm run dev
```

เปิด URL ที่ Vite แสดง (ค่าเริ่มต้น http://127.0.0.1:5173/)

```sh
npm test
npm run build
npm run preview
```

ไฟล์ production อยู่ใน dist/ เป็น static site ใช้บน Cloudflare Pages ได้ (build: npm run build, output: dist) ไม่มี backend และยังไม่ได้ deploy หรือเชื่อม repository ภายนอก

## สิ่งที่สร้าง

- React + Vite + TypeScript, Tailwind, GSAP ScrollTrigger, Lucide
- เนื้อหาเดิมครบ 8 บท 30 ย่อหน้า พร้อม source links และวันที่กำกับยอดพบสะสม
- ภาพเปิดจากภาพภาคสนามจริง ไม่ใช้ภาพ hero composite เป็นหลักฐาน
- ไทม์ไลน์และ SVG atlas เลือกปี หลักฐาน และพื้นที่ ใช้ geometry จาก SVG ผู้จัดทำ สีเน้นระดับภูมิภาคไม่ใช่ขอบเขตระบาด
- โปสเตอร์ 6 แบบ คงสัดส่วนและเครดิต มีภาพความละเอียดสูงให้ขยาย
- สกู๊ปจากไฟล์ผู้จัดทำ 2:43 นาที บีบอัดเป็น 720p ประมาณ 18 MB โหลดเมื่อกด ไม่เล่นอัตโนมัติ
- YouTube แบบ click-to-load และลิงก์รายการ Thai PBS ฉบับเต็ม ไม่มีการดาวน์โหลดวิดีโอจากเว็บไซต์ภายนอก
- C-SITE URL อยู่ที่ src/content/sources.ts ปุ่มลอยซ่อนเมื่อส่วนแจ้งเบาะแสอยู่ในจอ
- ฟอนต์ Thai/Latin เก็บใน build ไม่เรียก Google Fonts ขณะอ่าน
- responsive CSS, native modal dialogs, keyboard controls, skip link, reduced-motion

## โครงสร้างและการแก้ไข

- src/App.tsx: การเล่าเรื่องและปฏิสัมพันธ์
- src/styles.css: งานภาพและ responsive breakpoints
- src/content/chapters.ts: เนื้อหาภาษาไทยทั้งหมด
- src/content/timeline.ts: เหตุการณ์ วันที่เกิด/เผยแพร่ และประเภทหลักฐาน
- src/content/sources.ts: แหล่งอ้างอิงและ URL แจ้งเบาะแส
- src/content/media.ts: mapping ไฟล์ต้นฉบับ ขนาดจริง alt และสถานะสิทธิ์
- src/content/map.ts: SVG geometry แยกจากไฟล์ที่ได้รับ ไม่สร้าง GPS
- public/media/: ภาพและวิดีโอที่เตรียมเพื่อเว็บ ต้นฉบับใน media/ ไม่ถูกแก้ไข

เตรียมภาพใหม่: npm run prepare:media
เตรียมวิดีโอใหม่: npm run prepare:video (ใช้ ffmpeg-static)

ไฟล์ภาพจริงมีความละเอียดต่างจากตัวอย่างในบรีฟ จึงวัดจากต้นฉบับและเก็บสัดส่วนจริง ใช้ WebP สำหรับหน้าเว็บและภาพขยาย 3,600 px แทนสำเนา JPEG ขนาด 43 MB โดยไม่ตัดเนื้อหาภาพ

## แหล่งภาพ 6 แบบ

| ID | ต้นฉบับ |
|---|---|
| A | media/A0-4. ชุด.jpg |
| B | media/A0-4ชุด.png |
| C | media/A3-4ชุด.jpg |
| D | media/A0-2 ชุด.jpg |
| E | media/A0-2ชุด.jpg |
| F | media/A0-4 ชุด.png |

## หลักฐานและข้อจำกัด

ตรวจอ่าน S04, S05 และ S06 จากหน้าเว็บไซต์จริงวันที่ 27 ต.ค. 2569 ส่วนแหล่งอื่นอ้างอิงตามบรีฟที่ให้มา
440 คือยอดพบสะสม ณ 16 ต.ค. 2569 (เผยแพร่ 20 ต.ค.) ไม่ใช่ประชากรทั้งเขื่อน และไม่ใช้คำนวณอัตราการแพร่พันธุ์
101 และ 25 เป็นยอดที่มีขอบเขตช่วงเวลาต่างกัน ไม่รวมเป็นสถิติใหม่

NEEDS_EDITORIAL_REVIEW ก่อนเผยแพร่สาธารณะ:
- สิทธิ์เผยแพร่ซ้ำของโปสเตอร์ ภาพภาคสนาม ภาพประกอบ และคลิปที่ได้รับ
- วันถ่ายและสถานที่ของภาพที่ไม่มี metadata ยืนยัน; เว็บไซต์ไม่ระบุเป็นภาพเหตุการณ์เฉพาะ
- วันจัดทำอินโฟกราฟิกราคา; ไม่ใช่ราคาตลาดปัจจุบัน
- สิทธิ์ฝังและ availability ของ YouTube; มี fallback ไปต้นฉบับ
- คลิปวังกุ้งแสมดำและคลิปประวัติยังไม่ยืนยัน ไม่ได้นำมาใช้เป็นหลักฐาน
- ยังไม่มีคำบรรยายวิดีโอที่ตรวจสอบแล้ว เนื้อหาเรื่องหลักอ่านได้ครบโดยไม่เล่นวิดีโอ
- ลิงก์ legacy C-SITE ยังไม่ยืนยันการส่งรายงานปลายทาง ไม่ได้ทดสอบส่งข้อมูลจริง
- ยังไม่มีภาพยืนยันคลองสมุทรสงครามและหัวไทร/ระโนด จึงใช้เนื้อหาและเส้นแบ่งบทแทนภาพในส่วนนี้

## การตรวจสอบ

- npm test: 9 tests ครอบคลุม narrative, evidence filters, SVG region selection, timeline, hotspots, dialog, video opt-in, CTA, focus across scroll และไฟล์สื่อ
- npm run build: TypeScript และ production build ผ่าน
- npm audit: 0 vulnerabilities หลังอัปเดต sharp
- Browser: ตรวจ desktop และมือถือ 390×844, เมนู, SVG atlas, ภาพขยาย, Escape, วิดีโอ readyState 4 / duration 162.645s, ไม่เล่นอัตโนมัติ, ไม่พบ console errors หรือภาพเสียในการตรวจ
- ไม่พบ horizontal overflow ที่ขนาดมือถือที่ตรวจ; ไม่ได้อ้างว่าเป็น accessibility audit หรือ Core Web Vitals certification

## ฉบับปรับภาษาและการเคลื่อนไหว

ปรับข้อความหน้าเว็บเป็นภาษาสำหรับผู้อ่าน ย้ายข้อความตรวจงานภายในออกจากหน้าสารคดี โดยยังคงแหล่งอ้างอิง วันที่ และความหมายของตัวเลขสำรวจไว้ ข้อจำกัดด้านสิทธิ์และการตรวจสอบข้างต้นยังคงใช้สำหรับทีมงานก่อนเผยแพร่

- ภาพจริงในส่วนรู้จักปลา: media/FullSizeRender(10).heic → public/media/fish-photo.webp (แปลงรูปแบบและย่อขนาด ไม่มีการสร้างภาพปลาขึ้นใหม่)
- มาสคอต: public/media/fish-mascot.png และ public/media/fish-mascot.webp ใช้ภาพประกอบเดิม ลบพื้นหลังด้วย built-in image_gen เป็นองค์ประกอบตกแต่ง ไม่ใช่ภาพหลักฐาน
- Motion: src/hooks/useStoryMotion.ts และ src/components/ScrollMascot.tsx มี heading reveal, ภาพเลื่อนต่างจังหวะ, เส้นไทม์ไลน์/สายน้ำ และมาสคอตที่ตอบสนองทิศทาง scroll
- Reduced motion: ปิดการเคลื่อนไหวและซ่อนมาสคอต; มาสคอตไม่รับ pointer/focus และซ่อนขณะเปิด dialog
- ไม่แสดงช่องภาพรอเติมหรือบันทึกตรวจคลิปบนหน้าสาธารณะ ไม่มีการนำภาพต่างพื้นที่มาแทนจุดที่ยังขาด

Prompt ที่ใช้กับ built-in image_gen:
> Use case: background-extraction. Edit target: supplied fish illustration. Remove ONLY the white background to true transparent alpha. Preserve the existing left-facing illustrated fish, its exact pose, markings, fins, shapes, natural olive gray palette and detailed illustration style. No new artwork, no text, no shadow, no backdrop. Keep the entire fish uncut with small transparent padding. This is a decorative scroll-following mascot asset for a website, not documentary photographic evidence. Save the transparent PNG for project consumption.

ตรวจฉบับแก้ไข: 9 tests ผ่าน, production build ผ่าน, ตรวจภาพถ่ายจริง/มาสคอตบน desktop และ 390×844, ตรวจตำแหน่งมาสคอตเปลี่ยนตาม scroll, SVG timeline draw, และมาสคอตซ่อนเมื่อเปิดภาพขยาย ไม่พบภาพเสียหรือ horizontal overflow ในขนาดที่ตรวจ
# thaipbs-blackchin-tilapia
