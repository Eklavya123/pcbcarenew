-- Run in Supabase SQL Editor.
--
-- NOTE ON COLUMN TYPES: I don't have your actual `pages` table schema
-- (CREATE TABLE statement), only what the admin form's blank object implies.
-- service_areas and faqs are cast as jsonb below, which is the more common
-- pattern for Supabase list-of-mixed-content fields. If this errors with a
-- type mismatch, check the actual column type in Supabase's Table Editor and
-- switch service_areas to array['Jabalpur']::text[] instead.
--
-- WHAT'S REAL vs WHAT YOU SHOULD EDIT:
-- Brands for AC and washing machine are pulled from what you've told me
-- about your actual error-code database coverage. Refrigerator and
-- microwave brand claims are left generic — you know your real coverage,
-- I don't, so I'm not inventing a brand list there. Turnaround time,
-- warranty length, and pricing are deliberately absent from the FAQ
-- answers — those are specific business claims I don't have from you.

insert into pages (title, slug, excerpt, content, meta_title, meta_description, schema_type, service_areas, faqs, status)
values

('AC PCB Repair', 'ac-pcb-repair',
'AC PCB repair in Jabalpur for split and window ACs, including inverter control boards. Blue Star, Carrier, Lloyd, Panasonic, Voltas, Hitachi, Samsung and LG.',
'<h2>Common Signs Your AC PCB Has Failed</h2>
<p>If your AC isn''t turning on at all, the display is blinking an error code, the compressor won''t start even though the fan runs, the remote stops responding, or the unit switches off on its own shortly after starting — these are the most common signs of a faulty control board (PCB), not a gas or compressor problem. Diagnosing which one it is before replacing anything expensive is exactly what a proper PCB inspection is for.</p>
<h2>What We Repair</h2>
<p>We repair both indoor and outdoor unit control boards for split ACs, window AC control boards, and inverter AC control boards — including the more complex power modules used in inverter compressors. We work on Blue Star, Carrier, Lloyd, Panasonic, Voltas, Hitachi, Samsung and LG units.</p>
<h2>How the Repair Process Works</h2>
<p>Every board is tested on the bench to identify the actual failed component — a burnt relay, a damaged capacitor, a failed IPM module, or a cracked solder joint — rather than swapping the whole board by default. This keeps repair costs down compared to buying a new PCB, and gets your AC's original board back instead of an aftermarket replacement.</p>',
'AC PCB Repair in Jabalpur | PCB Care',
'AC PCB repair in Jabalpur for split, window, and inverter ACs. Blue Star, Carrier, Lloyd, Panasonic, Voltas, Hitachi, Samsung, LG.',
'service',
'["Jabalpur"]'::jsonb,
'[
  {"q":"My AC display is blinking an error code — is that always the PCB?","a":"Not always, but it''s one of the most common causes along with sensor or gas issues. Bring in the error code (or a photo of it) and we can tell you what it usually points to before you pay for anything."},
  {"q":"Do you repair inverter AC control boards?","a":"Yes, including the IPM/power module side, which is more complex than a standard non-inverter board."},
  {"q":"Do you offer a warranty on repaired PCBs?","a":"Yes — call us on +91-9111839918 for the exact warranty period on your specific repair."}
]'::jsonb,
'published'),


('Washing Machine PCB Repair', 'washing-machine-pcb-repair',
'Washing machine PCB repair in Jabalpur for front load and top load machines, semi-automatic and fully automatic. Blue Star, Carrier, Lloyd, Panasonic, Voltas, Hitachi, Samsung and LG.',
'<h2>Common Signs of a Faulty Washing Machine PCB</h2>
<p>If the machine won''t start despite having power, the drum doesn''t spin but the display lights up, the machine gets stuck mid-cycle, water won''t drain, or the display shows an error code and stops responding to buttons — these usually point to the control board rather than the motor or drum itself. A motor that hums but doesn''t turn, for example, is often a triac failure on the PCB, not a dead motor.</p>
<h2>What We Repair</h2>
<p>We work on control boards for both front load and top load washing machines, and both semi-automatic and fully automatic models, across Blue Star, Carrier, Lloyd, Panasonic, Voltas, Hitachi, Samsung and LG.</p>
<h2>How the Repair Process Works</h2>
<p>The board is tested to find the specific failed component — commonly a triac, relay, or a damaged track from water ingress — and repaired at the component level where possible, rather than replacing the entire board. This is usually significantly cheaper than a full PCB replacement and has a faster turnaround for common faults.</p>',
'Washing Machine PCB Repair in Jabalpur | PCB Care',
'Washing machine PCB repair in Jabalpur — front load, top load, semi and fully automatic. Blue Star, Carrier, Lloyd, Panasonic, Voltas, Hitachi, Samsung, LG.',
'service',
'["Jabalpur"]'::jsonb,
'[
  {"q":"My washing machine is stuck mid-cycle and won''t respond to any buttons — is that the PCB?","a":"Often yes, especially if the display is still lit but nothing responds. Bring it in and we''ll confirm before quoting any repair."},
  {"q":"Can water damage to the PCB be repaired?","a":"In many cases yes, if the corrosion hasn''t spread too far across the board — we''ll inspect and tell you honestly if it''s repairable or needs replacement."},
  {"q":"How long does a typical washing machine PCB repair take?","a":"Depends on the fault — call us on +91-9111839918 and we can give you a realistic estimate once we know the symptom."}
]'::jsonb,
'published'),


('Refrigerator PCB Repair', 'refrigerator-pcb-repair',
'Refrigerator PCB repair in Jabalpur for single-door, double-door, and side-by-side refrigerators, including inverter compressor control boards.',
'<h2>Common Signs of a Faulty Refrigerator PCB</h2>
<p>If your fridge has stopped cooling but the compressor still runs, the compressor won''t start at all despite power reaching the unit, the display panel is unresponsive or showing an error, or defrost isn''t cycling on schedule leading to ice buildup — these are typical symptoms of a control board fault rather than a refrigerant leak or a dead compressor.</p>
<h2>What We Repair</h2>
<p>We work on control boards for single-door, double-door, and side-by-side refrigerators, including the more complex control boards used in inverter compressor models.</p>
<!-- TODO: add your real serviced brand list here once confirmed — left generic since I don''t have your specific refrigerator brand coverage on file. -->
<h2>How the Repair Process Works</h2>
<p>The board is bench-tested to isolate the failed component before any repair is quoted, so you''re not paying to replace a whole board when the fault is a single relay or a damaged sensor circuit.</p>',
'Refrigerator PCB Repair in Jabalpur | PCB Care',
'Refrigerator PCB repair in Jabalpur — single-door, double-door, side-by-side, including inverter compressor control boards.',
'service',
'["Jabalpur"]'::jsonb,
'[
  {"q":"My fridge compressor runs but it isn''t cooling — could this be the PCB?","a":"It can be, along with gas or sensor issues. Bring it in for a proper diagnosis before assuming it needs a full compressor or gas refill."},
  {"q":"Do you repair inverter refrigerator control boards?","a":"Yes, including the compressor control side, which is more involved than a standard fridge board."},
  {"q":"What''s the warranty on a repaired refrigerator PCB?","a":"Call us on +91-9111839918 for the exact terms on your specific repair."}
]'::jsonb,
'published'),


('Microwave PCB Repair', 'microwave-pcb-repair',
'Microwave PCB repair in Jabalpur for solo, grill, and convection microwaves.',
'<h2>Common Signs of a Faulty Microwave PCB</h2>
<p>If the microwave has no power at all, the display won''t light up, the buttons don''t respond, the turntable doesn''t rotate even though the display works, or you notice sparking or unusual smells during operation — these point to the control board rather than the magnetron in most cases. Sparking specifically should be checked promptly rather than continuing to use the unit.</p>
<h2>What We Repair</h2>
<p>We work on control boards for solo, grill, and convection microwaves.</p>
<!-- TODO: add your real serviced brand list here once confirmed. -->
<h2>How the Repair Process Works</h2>
<p>The board is tested to confirm whether the fault is actually on the PCB or elsewhere (a door switch or the magnetron itself commonly get mistaken for PCB faults), so you''re only paying for the repair that''s actually needed.</p>',
'Microwave PCB Repair in Jabalpur | PCB Care',
'Microwave PCB repair in Jabalpur — solo, grill, and convection microwaves.',
'service',
'["Jabalpur"]'::jsonb,
'[
  {"q":"My microwave display works but the turntable doesn''t turn — is that the PCB?","a":"Sometimes — it can also be the turntable motor itself or a door switch. We''ll test before quoting a PCB repair."},
  {"q":"Is it safe to keep using a microwave that sparks?","a":"No — stop using it and get it checked. Sparking can indicate a serious fault and continuing to run it isn''t safe."},
  {"q":"Do you repair convection microwave boards, or just solo/grill?","a":"We work on all three types. Call us on +91-9111839918 with your model details."}
]'::jsonb,
'published');
