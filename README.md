# ProiectPlanCalatorii (saptamana 9 - nu e varianta finala)

Baza de date:

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


CREATE DATABASE `plan` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `plan`;

-- --------------------------------------------------------

--
-- Table structure for table `calatorie`
--

CREATE TABLE IF NOT EXISTS `calatorie` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `denumire` varchar(50) DEFAULT NULL,
  `itinerariu_id` int(20) NOT NULL,
  `price` int(300) NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `itinerariu`
--

CREATE TABLE IF NOT EXISTS `itinerariu` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `tara` varchar(30) DEFAULT NULL,
  `orase` varchar(100) NOT NULL,
  `traseu` text(500) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id_produse` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;




Descriere Initiala proiect(saptamana 5):
Proiectul de tip single page interface, va fi denumit:”Pasionatii de calatorii”.
Va fi dotat cu 2 optiuni: inregistrare new users, deschizandu-se o fereastra ce va contine: Nume, E-mail si Parola, apoi un buton pentru trimiterea cererii de inscriere. A doua optiune se va adresa utilizatorilor ce au deja cont, aici se va deschide o fereastra in care se va cere User si Parola precum si buton de autentificare.
Va fi inclusa si o rubrica denumita “Jurnal de calatorii”, ce va cuprinde 2 categorii distincte: Romania si Strainatate. In fiecare dintre aceste rubrici, vor aparea postarilor userilor ce va cuprinde planurile lor de calatorie si experientele avute in locurile respective.
Userii vor avea posibilitatea sa posteze in Jurnalul de calatorii planul de calatorii si impresiile lor de fiecare data cand vor dori.
Va exista si un container ce va cuprinde un text:”Inainte sa pleci intr-o noua aventura, nu uita sa verifici:”, urmand o lista ce va cuprinde: - vremea, cu un buton ce va face trimitere la Weather Underground si – o trimitere catre jurnalul de calatorii de se pot consulta planuri de calatorii impreuna cu experientele celorlalti.
Acesta este descrierea initiala a proiectului, pe masura ce se va lucra la dezvoltatea acestuia, modificari putand sa apara.


Student: Constantin Lucian Mihai
Grupa: 1068
