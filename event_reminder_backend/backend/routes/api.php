<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AppointmentController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require authentication via Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Appointment routes
    Route::apiResource('appointments', AppointmentController::class);
    // Custom route for deleting overdue appointments
    Route::delete('/appointments/overdue', [AppointmentController::class, 'destroyOverdue']);
});

// The default /user route provided by install:api is replaced by the one in the middleware group
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
