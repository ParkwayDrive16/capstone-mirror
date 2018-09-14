insert ignore into `vehicles`
	(`registration`, `make`, `model`, `year`, `colour`, `status`)
values
    ("ABC123","Toyota", "Corolla", 2014, "Blue", 1),
    ("QRB990","BMW", "325i", 2003, "Black", 1),
    ("TAA325","Peugeot", "307 SW", 2008, "Grey", 1),
    ("UBR666","Ford", "Falcon", 2013, "Orange", 1),
    ("FOK356","Holden", "Barina", 2017, "White", 0),
    ("JTD955","Holden", "Commadore", 2005, "Grey", 0),
    ("BLA555","Mazda", "3", 2010, "White", 0),
    ("QOP299","Kia", "Rio", 2013, "Pink", 0),
    ("YODUDE","Nissan", "Skyline", 2010, "Black", 0),
    ("MAGPIES", "Mercedes-Benz", "CLC200 Kompressor", 2009, "Black", 0),
    ("HEL111", "Holden", "Astra", 2014, "Black", 0);

insert ignore into `bookings`
	(`timestamp`, `registration`, `customer_id`, `duration`, `start_location`, `end_location`)
values
	("2018-04-02 13:11:00", "YODUDE", "112606983151403770748", 120, POINT(-37.815603, 144.969967), POINT(-37.807232, 144.963620)),
    ("2018-04-02 13:11:00", "ABC123", "112606983151403770748", 720, POINT(-37.814022, 144.961954), POINT(-37.808401, 144.956159)),
    ("2018-04-03 20:04:00", "UBR666", "102908696637872505288", 60, POINT(-37.810422, 144.968597), POINT(-37.815603, 144.969967)),
    ("2018-04-05 15:45:00", "YODUDE", "102908696637872505288", 180, POINT(-37.807232, 144.963620), POINT(-37.810422, 144.968597)),
    ("2018-04-05 15:45:00", "MAGPIES", "117051605584473461533", 360, POINT(-37.815603, 144.969967), POINT(-37.807232, 144.963620)),
    ("2018-04-02 13:11:00", "QOP299", "117051605584473461533", 60, POINT(-37.814022, 144.961954), POINT(-37.808401, 144.956159)),
    ("2018-04-03 20:04:00", "JTD955", "110833881946064880314", 120, POINT(-37.810422, 144.968597), POINT(-37.815603, 144.969967)),
    ("2018-04-05 15:45:00", "FOK356", "110833881946064880314", 180, POINT(-37.807232, 144.963620), POINT(-37.810422, 144.968597));

insert ignore into `admins`
	(`admin_id`)
values   
    ("102908696637872505288"),
    ("117051605584473461533"),
    ("110833881946064880314"),
    ("112606983151403770748");
    
insert ignore into `locations`
	(`registration`, `timestamp`, `location`)
values
	("ABC123", "2018-04-02 13:00:00", POINT(-37.808401, 144.956159)),
    ("QRB990", "2018-04-02 13:00:00", POINT(-37.809741, 144.970895)),
    ("TAA325", "2018-04-02 13:00:00", POINT(-37.805819, 144.960025)),
    ("UBR666", "2018-04-02 13:00:00", POINT(-37.815603, 144.969967)),
    ("FOK356", "2018-04-02 13:00:00", POINT(-37.814022, 144.961954)),
    ("JTD955", "2018-04-02 13:00:00", POINT(-37.816170, 144.956179)),
    ("BLA555", "2018-04-02 13:00:00", POINT(-37.818681, 144.958982)),
    ("QOP299", "2018-04-02 13:00:00", POINT(-37.811510, 144.965667)),
    ("YODUDE", "2018-04-02 13:00:00", POINT(-37.810422, 144.968597)),
    ("MAGPIES", "2018-04-02 13:00:00", POINT(-37.807232, 144.963620));

