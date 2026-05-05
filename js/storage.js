(function () {
  "use strict";

  var BOOKING_KEY = "kemoBookings";
  var INVOICE_KEY = "kemoInvoices";

  function readArray(key) {
    try {
      var raw = window.localStorage.getItem(key);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeArray(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(Array.isArray(value) ? value : []));
    } catch (error) {
      console.warn("Kemo storage write failed", error);
    }
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function getBookings() {
    return readArray(BOOKING_KEY).sort(function (a, b) {
      return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
    });
  }

  function saveBooking(booking) {
    var bookings = getBookings();
    var nextBooking = Object.assign({}, booking, {
      updatedAt: booking.updatedAt || nowISO(),
      createdAt: booking.createdAt || nowISO(),
    });
    var replaced = false;
    for (var i = 0; i < bookings.length; i += 1) {
      if (bookings[i].reference === nextBooking.reference) {
        bookings[i] = Object.assign({}, bookings[i], nextBooking);
        replaced = true;
        break;
      }
    }
    if (!replaced) bookings.unshift(nextBooking);
    writeArray(BOOKING_KEY, bookings);
    return nextBooking;
  }

  function updateBooking(reference, updates) {
    var bookings = getBookings();
    var updated = null;
    for (var i = 0; i < bookings.length; i += 1) {
      if (bookings[i].reference === reference) {
        updated = Object.assign({}, bookings[i], updates || {}, { updatedAt: nowISO() });
        bookings[i] = updated;
        break;
      }
    }
    writeArray(BOOKING_KEY, bookings);
    return updated;
  }

  function getBookingByReference(reference) {
    var bookings = getBookings();
    for (var i = 0; i < bookings.length; i += 1) {
      if (bookings[i].reference === reference) return bookings[i];
    }
    return null;
  }

  function getInvoices() {
    return readArray(INVOICE_KEY).sort(function (a, b) {
      return String(b.issueDate || "").localeCompare(String(a.issueDate || ""));
    });
  }

  function saveInvoice(invoice) {
    var invoices = getInvoices();
    var nextInvoice = Object.assign({}, invoice);
    var replaced = false;
    for (var i = 0; i < invoices.length; i += 1) {
      if (invoices[i].invoiceNumber === nextInvoice.invoiceNumber || invoices[i].reference === nextInvoice.reference) {
        invoices[i] = Object.assign({}, invoices[i], nextInvoice);
        replaced = true;
        break;
      }
    }
    if (!replaced) invoices.unshift(nextInvoice);
    writeArray(INVOICE_KEY, invoices);
    return nextInvoice;
  }

  function updateInvoice(reference, updates) {
    var invoices = getInvoices();
    var updated = null;
    for (var i = 0; i < invoices.length; i += 1) {
      if (invoices[i].reference === reference || invoices[i].invoiceNumber === reference) {
        updated = Object.assign({}, invoices[i], updates || {});
        invoices[i] = updated;
        break;
      }
    }
    writeArray(INVOICE_KEY, invoices);
    return updated;
  }

  function getInvoiceByReference(reference) {
    var invoices = getInvoices();
    for (var i = 0; i < invoices.length; i += 1) {
      if (invoices[i].reference === reference || invoices[i].invoiceNumber === reference) return invoices[i];
    }
    return null;
  }

  window.KemoStorage = {
    getBookings: getBookings,
    saveBooking: saveBooking,
    updateBooking: updateBooking,
    getBookingByReference: getBookingByReference,
    getInvoices: getInvoices,
    saveInvoice: saveInvoice,
    updateInvoice: updateInvoice,
    getInvoiceByReference: getInvoiceByReference,
  };
})();
