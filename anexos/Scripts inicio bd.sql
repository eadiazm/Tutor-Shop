INSERT INTO public."People"
(id, names, "lastNames", "typeDocument", "numberDocument", email, gender, birthdate, phone, "userId", "cityId")
VALUES(nextval('"People_id_seq"'::regclass), 'Edgar Alexander', 'Díaz Murillo', 'CC', '80016199', 'eadiazm@gmail.com', 'M', '1977-07-30', '3134258856', null, 74539);

INSERT INTO public."Tutors"
(id, profession, "personId")
VALUES(nextval('"Tutors_id_seq"'::regclass), 'Ingeniero de sistemas especializado en PHP', 1);

INSERT INTO public."People"
(id, names, "lastNames", "typeDocument", "numberDocument", email, gender, birthdate, phone, "userId", "cityId")
VALUES(nextval('"People_id_seq"'::regclass), 'Sandra Paola', 'Olarte Casallas', 'CC', '50645897', 'solarte@gmail.com', 'F', '1978-05-06', '3002583691', null, 74589);

INSERT INTO public."Students"
(id, "personId")
VALUES(nextval('"Students_id_seq"'::regclass), 2);

INSERT INTO public."People"
(id, names, "lastNames", "typeDocument", "numberDocument", email, gender, birthdate, phone, "userId", "cityId")
VALUES(nextval('"People_id_seq"'::regclass), 'Mario', 'Moreno', 'CC', '78525252', 'mmoreno@gmail.com', 'M', '1985-06-01', '3004444691', null, 75000);

INSERT INTO public."Students"
(id, "personId")
VALUES(nextval('"Students_id_seq"'::regclass), 3);

INSERT INTO public."Reservations"
(id, "date", date_start, date_end, status, "studentId", "tutorId", "reservationTypeId")
VALUES(nextval('"Reservations_id_seq"'::regclass), '2024-07-07', '2024-07-10', '2024-07-15', 'C'::text, 1, 1, 'PI');


INSERT INTO public."Reservations"
(id, "date", date_start, date_end, status, "studentId", "tutorId", "reservationTypeId")
VALUES(nextval('"Reservations_id_seq"'::regclass), '2024-07-07', '2024-08-10', '2024-08-15', 'C'::text, 2, 1, 'PG');


INSERT INTO public."Subjects"
(id, "name", description, grade)
VALUES(nextval('"Subjects_id_seq"'::regclass), 'Matemáticas', 'Curso de matemáticas básicas', 'Básico');

INSERT INTO public."Subjects"
(id, "name", description, grade)
VALUES(nextval('"Subjects_id_seq"'::regclass), 'Lenguaje', 'Curso de lenguaje básico', 'Básico');

INSERT INTO public."Subjects"
(id, "name", description, grade)
VALUES(nextval('"Subjects_id_seq"'::regclass), 'Geografía', 'Curso de geografía básica', 'Básico');

INSERT INTO public."Subjects"
(id, "name", description, grade)
VALUES(nextval('"Subjects_id_seq"'::regclass), 'Historia', 'Curso de historia básica', 'Básico');

INSERT INTO public."Subjects"
(id, "name", description, grade)
VALUES(nextval('"Subjects_id_seq"'::regclass), 'Álgebra', 'Curso de álgebra básica', 'Básico');

INSERT INTO public."Subjects"
(id, "name", description, grade)
VALUES(nextval('"Subjects_id_seq"'::regclass), 'Cálculo', 'Curso de cálculo básico', 'Básico');

INSERT INTO public."Subjects"
(id, "name", description, grade)
VALUES(nextval('"Subjects_id_seq"'::regclass), 'Cálculo diferencial', 'Curso de cálculo intermedio', 'Intermedio');

INSERT INTO public."Subjects"
(id, "name", description, grade)
VALUES(nextval('"Subjects_id_seq"'::regclass), 'Cálculo integral', 'Curso de cálculo avanzado', 'Avanzado');

