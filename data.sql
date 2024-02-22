

-- BOOK --
truncate table book
-- select
select * from book
where pub_date BETWEEN NOW() - INTERVAL '1 MONTH' AND NOW() 

-- insert
INSERT INTO book (title, img, category_id, form, isbn, summary, description, author, pages, contents, price, pub_date)
VALUES ('콩쥐 팥쥐', 4, 3, 'ebook', 4, '콩팥..', '콩심은데 콩나고..', '김콩팥', 100, '목차입니다.', 20000, '2024-2-07');

INSERT INTO book (title, img, category_id, form, isbn, summary, description, author, pages, contents, price, pub_date)
VALUES ('용궁에 간 토끼', 5, 1, '종이책', 5, '깡충..', '용왕님 하이..', '김거북', 100, '목차입니다.', 20000, '2023-11-01');

INSERT INTO book (title, img, category_id, form, isbn, summary, description, author, pages, contents, price, pub_date)
VALUES ('해님달님', 15, 2, 'ebook', 6, '동앗줄..', '황금 동앗줄..!', '김해님', 100, '목차입니다.', 20000, '2023-12-16');

INSERT INTO book (title, img, category_id, form, isbn, summary, description, author, pages, contents, price, pub_date)
VALUES ('장화홍련전', 80, 1, 'ebook', 7, '기억이 안나요..', '장화와 홍련이?..', '김장화', 100, '목차입니다.', 20000, '2024-03-01');

INSERT INTO book (title, img, category_id, form, isbn, summary, description, author, pages, contents, price, pub_date)
VALUES ('견우와 직녀', 8, 1, 'ebook', 8, '오작교!!', '칠월 칠석!!', '김다리', 100, '목차입니다.', 20000, '2024-02-01');

INSERT INTO book (title, img, category_id, form, isbn, summary, description, author, pages, contents, price, pub_date)
VALUES ('효녀 심청', 12, 3, '종이책', 9, '심청아..', '공양미 삼백석..', '김심청', 100, '목차입니다.', 20000, '2024-01-15');

INSERT INTO book (title, img, category_id, form, isbn, summary, description, author, pages, contents, price, pub_date)
VALUES ('혹부리 영감', 22, 2, 'ebook', 10, '노래 주머니..', '혹 두개 되버림..', '김영감', 100, '목차입니다.', 20000, '2024-02-05');

